import { useContext } from "react";
import { AppContext } from "./AppContext";

/**
 * 自定义 Hook，用于方便地访问 AppContext 上下文内容。
 * 使用此 Hook 时，必须确保组件被包裹在 AppProvider 内，
 * 否则 context 会是 undefined，会抛出错误提示。
 *
 * @throws {Error} 如果不在 AppProvider 中调用，抛出错误
 * @returns 返回 AppContext 的值（状态和操作方法）
 */
export const useAppContext = () => {
  // 通过 useContext 获取上下文的值
  const context = useContext(AppContext);

  // 如果没有 Provider 包裹，context 会是 undefined
  if (!context) {
    // 抛出错误，提醒必须在 Provider 内部使用
    throw new Error("useAppContext must be used within an AppProvider");
  }

  // 返回上下文内容
  return context;
};
