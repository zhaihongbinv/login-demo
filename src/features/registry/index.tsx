import { Button, Flex, Form, Input, message, Progress } from "antd";
import Panel from "@/components/Pane";
import { FormEventHandler, useCallback, useState } from "react";
import { emailReg } from "@/utils/common";

type FieldType = {
  email?: string;
  password?: string;
  password2?: string;
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

const RegistryPage = () => {
  const [pwdStrength, setPwdStrength] = useState(0);
  const [showPwdProgress, toggleShowPwdProgress] = useState(false);

  const [form] = Form.useForm<FieldType>();

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
    console.log(values.email, values.password, values.password2);

    if (!values.email || !values.password || !values.password2) {
      return;
    }

    message.success("注册成功！");
    history.back();
  }, []);

  return (
    <Panel>
      <Form onFinish={onFinish} form={form} labelCol={{ span: 4 }}>
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

        <Form.Item<FieldType>
          label="确认密码"
          name="password2"
          rules={[
            {
              required: true,
              message: "两次密码不一致！",
              max: 16,
              min: 6,
              validator(_, value) {
                if (value !== form.getFieldValue("password")) {
                  return Promise.reject();
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <Input.Password maxLength={16} />
        </Form.Item>

        <Flex
          gap="24px"
          className="flex-col md:flex-row mt-[40px] md:mt-0  mb-12 md:mb-0"
        >
          <Button
            block
            htmlType="submit"
            onClick={() => {
              history.back();
            }}
          >
            返回
          </Button>
          <Button block type="primary" htmlType="submit">
            注册
          </Button>
        </Flex>
      </Form>
    </Panel>
  );
};

export default RegistryPage;
