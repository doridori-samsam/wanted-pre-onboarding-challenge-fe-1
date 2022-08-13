import { useState } from "react";

// 수정 or 삭제 후 업데이트 후 재 렌더링을 위한 함수
function useUpdate() {
  const [isUpDate, setIsUpdate] = useState(false);

  function upDate() {
    setIsUpdate(!isUpDate);
  }
  return { upDate, isUpDate, setIsUpdate };
}

export default useUpdate;
