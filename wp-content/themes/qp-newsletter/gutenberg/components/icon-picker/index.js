import { useEffect, useRef, useState } from "@wordpress/element";
import { Popover, Button, SearchControl } from "@wordpress/components";
import { setSuffixedAttributes, getSpriteUri } from "@marameodesign/utils";
import { twMerge } from "tailwind-merge";

export const IconPicker = props => {
  const {
    attributes,
    setAttributes,
    isSelected,
    options = [],
    targetAttribute = null,
    suffix = "",
    __hasSpacingBottom = false,
    isSprite = false,
  } = props;
  const [popoverAnchor, setPopoverAnchor] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef();
  const buttonRef = useRef();
  const [searchInput, setSearchInput] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const icon = attributes[`${targetAttribute}${suffix}`];
  const iconAlt = attributes[`${targetAttribute}Alt${suffix}`];

  // Bail if no target attribute provided
  if (!targetAttribute) {
    console.error(
      props.name,
      "Using the IconPicker component but no target attribute provided"
    );
    return;
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        event.target !== buttonRef.current
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, buttonRef]);

  useEffect(() => {
    if (!isSelected) {
      setIsVisible(false);
    }
  }, [isSelected]);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  /**
   * Toggle visible state
   */
  const toggleVisible = () => {
    setIsVisible(state => !state);
  };

  /**
   * Handle filtering on search input
   */
  const handleSearchInput = value => {
    setSearchInput(value);
    const searchValue = value.toLowerCase().trim();

    const filtered = options.filter(option =>
      option.label.toLowerCase().includes(searchValue)
    );
    setFilteredOptions(filtered);
  };

  /**
   * Handle selection of icon from the icon options
   */
  const handleIconClick = option => {
    // Set headingIcon attribute
    setSuffixedAttributes(
      setAttributes,
      {
        [targetAttribute]: option.value,
        [`${targetAttribute}Alt`]: option.label
      },
      suffix
    );
    // Close popover
    setIsVisible(false);
    // Clear search input
    setSearchInput("");
    // Reset filtered options
    setFilteredOptions(options);
  };

  return (
    <div
      className="mmd-custom-popover"
      style={{
        position: "relative",
        marginBottom: __hasSpacingBottom ? "1rem" : null,
      }}
    >
      <Button
        ref={setPopoverAnchor}
        icon={() => {
          return (
            <div className="mmd-custom-popover__trigger-icon">
              {icon && (
                isSprite ? (
                  <svg className="icon size-6" style={{ width: "24px", height: "24px" }} aria-hidden="true">
                    <use href={getSpriteUri(icon)}></use>
                  </svg>
                ) : (
                  <img
                    src={icon}
                    alt={iconAlt}
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    style={{
                      maxWidth: "24px",
                      maxHeight: "24px",
                    }}
                  />
                )
              )}
            </div>
          );
        }}
        text="Select icon"
        onClick={toggleVisible}
        className="mmd-custom-popover__trigger"
      />
      {isVisible && (
        <Popover anchor={popoverAnchor} ref={popoverRef} focusOnMount={false}>
          <div className={"mmd-custom-popover__wrapper"}>
            <SearchControl
              __nextHasNoMarginBottom
              label="Search posts"
              hideLabelFromVision={true}
              value={searchInput}
              onChange={handleSearchInput}
            />
            <div className="mmd-custom-popover__grid">
              {filteredOptions.map(option => {
                return (
                  <button
                    className={twMerge(
                      "mmd-custom-popover__grid__item",
                      option.value === icon && "is-active"
                    )}
                    onClick={() => handleIconClick(option)}
                  >
                    {option.value && (
                      isSprite ? (
                        <svg className="icon size-6" style={{ width: "24px", height: "24px" }} aria-hidden="true">
                          <use href={getSpriteUri(option.value)}></use>
                        </svg>
                      ) : (
                        <img
                          src={option.value}
                          alt={option.label}
                          width={24}
                          height={24}
                          loading="lazy"
                          decoding="async"
                          style={{
                            maxWidth: "24px",
                            maxHeight: "24px",
                          }}
                        />
                      )
                    )}
                    <strong className="mmd-custom-popover__grid__item-title">
                      {option.label}
                    </strong>
                  </button>
                );
              })}
            </div>
          </div>
        </Popover>
      )}
    </div>
  );
};
