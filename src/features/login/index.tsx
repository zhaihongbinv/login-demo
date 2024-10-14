import { Button, Checkbox, Flex, Form, Input, message, Progress } from "antd";
import Panel from "@/components/Pane";
import { Link } from "react-router-dom";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { emailReg } from "@/utils/common";

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

const checkPasswordStrength = (password: string) => {
  let strength = 0;
  // 根据需要添加更多密码强度的判断逻辑
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/-]/.test(password)) strength += 1;
  return strength;
};

const LoginPage = () => {
  const [pwdStrength, setPwdStrength] = useState(0);
  const [showPwdProgress, toggleShowPwdProgress] = useState(false);
  const [initialFormValue] = useState<FieldType>(() => {
    return {
      email: localStorage.getItem("email") || undefined,
      password: localStorage.getItem("password") || undefined,
      remember: !!localStorage.getItem("remember"),
    };
  });

  const handlePasswordChange = useCallback<FormEventHandler<HTMLInputElement>>(
    (e) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const value = e.target.value;
      toggleShowPwdProgress(!!value);
      if (!value) {
        return;
      }
      setPwdStrength(checkPasswordStrength(value));
    },
    [],
  );

  const onFinish = useCallback((values: FieldType) => {
    if (!values.email || !values.password) {
      return;
    }

    if (values.remember) {
      localStorage.setItem("email", values.email);
      localStorage.setItem("password", values.password);
      localStorage.setItem("remember", "true");
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("remember");
    }

    message.success("登录成功！");

    toggleShowPwdProgress(false);
    setPwdStrength(0);
  }, []);

  useEffect(() => {
    if (initialFormValue.password) {
      toggleShowPwdProgress(true);
      setPwdStrength(checkPasswordStrength(initialFormValue.password));
    }
  }, [initialFormValue.password]);

  return (
    <Panel>
      <Form initialValues={initialFormValue} onFinish={onFinish}>
        <Form.Item<FieldType>
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入正确的邮箱！",
              pattern: emailReg,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <div className="relative">
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入6~12位密码！",
                max: 16,
                min: 6,
              },
            ]}
          >
            <Input.Password onInput={handlePasswordChange} maxLength={16} />
          </Form.Item>
          {showPwdProgress && (
            <Flex
              className="absolute top-1 md:top-8 right-0"
              align="center"
              gap={8}
            >
              <span className="text-xs">密码强度</span>
              <Progress
                className="w-20"
                percent={pwdStrength * 20}
                status="active"
                showInfo={false}
              />
            </Flex>
          )}
        </div>

        <Flex justify="space-between">
          <Form.Item<FieldType> name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Link to="/registry" className="h-[32px] leading-[32px]">
            注册账号
          </Link>
        </Flex>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button block type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </Panel>
  );
};

export default LoginPage;
