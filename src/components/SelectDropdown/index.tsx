import { useState, useRef, useEffect } from 'react';
import {
    MdOutlineKeyboardArrowDown,
    MdOutlineKeyboardArrowUp,
} from 'react-icons/md';
import { AiOutlineCheck } from 'react-icons/ai';

interface SelectDropdownProp {
    label?: string;
    placeholder?: string;
    data?: string[];
    value?: string;
    onChange?: (val: string) => any;
    searchable?: boolean;
    inputClassName?: string;
    labelClassName?: string;
}

interface CustomRef {
    dropdown: HTMLDivElement | null;
    searchInput: HTMLInputElement | null;
}

export const SelectDropdown = ({
    label = '',
    placeholder = 'Select',
    data = [],
    value = '',
    onChange = () => null,
    searchable = false,
}: SelectDropdownProp) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [options, setOptions] = useState<string[]>(data);

    const [selectedRowId, setSelectedRowId] = useState('');

    const randomKey = '9080495';

    const ref = useRef<CustomRef>({
        dropdown: null,
        searchInput: null,
    });

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const scrollToSelected = () => {
        const row = document.getElementById(selectedRowId);

        if (!row) return;

        const rowHeight = row.getClientRects()['0']?.height || 0;

        const indexOfSelected = data.indexOf(value);

        if (isNaN(indexOfSelected)) return;

        setTimeout(() => {
            const distance = rowHeight * indexOfSelected;

            const { dropdown } = ref.current;

            dropdown?.scrollTo({
                top: distance,
                left: 0,
                behavior: 'smooth',
            });
        }, 500);
    };

    useEffect(() => {
        if (isOpen) {
            scrollToSelected();

            if (searchable) {
                const { searchInput } = ref.current;
                searchInput?.focus();
            }
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchable && searchText !== value) {
            const filteredData = data.filter((val) => {
                return val.toLowerCase().includes(searchText.toLowerCase());
            });

            setOptions(filteredData);
        } else if (
            searchable &&
            searchText.toLowerCase() === value.toLowerCase()
        ) {
            setOptions(data);

            setTimeout(() => {
                scrollToSelected();
            }, 500);
        }
    }, [searchText]);

    useEffect(() => {
        setSearchText(value);
    }, [value]);

    return (
        <div className="relative flex flex-col">
            {label.length > 0 && (
                <div className='font-semibold text-sm text-[#344054]'>
                    {label}
                </div>
            )}

            <div
                className='w-full flex items-center py-2 px-3 rounded-lg cursor-pointer border border-[#d0d5dd] border-solid'
                onClick={toggle}
            >
                <input
                    ref={(element) => {
                        ref.current.searchInput = element;
                    }}
                    className={`${!isOpen || !searchable ? 'hidden' : 'flex'} font-medium text-base text-[#101828]`}
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />

                {isOpen && searchable ? (
                    <></>
                ) : (
                    <>
                        {value.length > 0 ? (
                            <div className='text-[#6d7f8b] text-base flex-1'>{value}</div>
                        ) : (
                            <div className='text-[#667085] text-base flex-1'>
                                {placeholder}
                            </div>
                        )}
                    </>
                )}

                {isOpen ? (
                    <MdOutlineKeyboardArrowUp
                        className='text-[#667085] cursor-pointer'
                        size={20}
                        onClick={toggle}
                    />
                ) : (
                    <MdOutlineKeyboardArrowDown
                        className='text-[#667085] cursor-pointer'
                        size={20}
                        color="#667085"
                        onClick={toggle}
                    />
                )}
            </div>

            <div
                ref={(element) => {
                    ref.current.dropdown = element;
                }}
                className={`${isOpen ? 'flex' : 'hidden'} absolute top-10 z-50 flex-col bg-white w-full overflow-y-auto border border-[#d0d5dd] border-solid`}
            >
                {options.map((current) => {
                    const randomId = randomKey + '-' + current.toLowerCase();
                    return (
                        <div
                            id={randomId}
                            key={randomId}
                            className={`${current === value ? 'bg-[#f9fafb]' : 'hover:bg-[#f9fafb]'} flex items-center justify-between py-2 px-3 gap-2 cursor-pointer`}
                            onClick={() => {
                                onChange(current);
                                toggle();
                                setSelectedRowId(randomId);
                            }}
                        >
                            <div className={`flex-1 text-base text-[#101828] overflow-hidden max-h-[24px]`}>{current}</div>

                            {current === value && (
                                <AiOutlineCheck color="#0D3DDC" />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
