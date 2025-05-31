import { useState } from 'react';
import { fetchAllDistrictByProvince, fetchAllProvinces } from 'services/shippingApi';
import { ResponseType } from 'types';
import { formatProvinceDropDownList, formatWardDropdownList } from 'utils/helper';
import { formatDistrictDropdownList } from '../utils/helper';
import { DistrictType, ProvinceType } from 'types/shipping';
import { fetchAllWardByDistrict } from '../services/shippingApi';
import { WardType } from '../types/shipping';

const useShipping = () => {
  const [provinceList, setProvinceList] = useState<any>([]);
  const [districtList, setDistrictList] = useState<any>([]);
  const [wardList, setWardList] = useState<any>([]);

  const getAllProvince = async () => {
    const response: ResponseType = await fetchAllProvinces();
    if (response.data) {
      const list = formatProvinceDropDownList(response.data as ProvinceType[]);
      setProvinceList(list);
    }
  };

  const getAllDistrictByProvince = async (provinceId: number) => {
    const response: ResponseType = await fetchAllDistrictByProvince(provinceId);
    if (response.data) {
      const list = formatDistrictDropdownList(response.data as DistrictType[]);
      setDistrictList(list);
    }
  };

  const getAllWardByDistrict = async (districtId: number) => {
    const response: ResponseType = await fetchAllWardByDistrict(districtId);
    if (response.data) {
      const list = formatWardDropdownList(response.data as WardType[]);
      setWardList(list);
    }
  };

  return {
    provinceList,
    districtList,
    wardList,
    getAllProvince,
    getAllDistrictByProvince,
    getAllWardByDistrict,
  };
};

export default useShipping;
