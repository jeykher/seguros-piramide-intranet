import React from "react"

export const Links = [
    {
      to: '/portal-gestion',
      text: 'Tablero',
      svg: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 11.1111H8.88889V0H0V11.1111ZM0 20H8.88889V13.3333H0V20ZM11.1111 20H20V8.88889H11.1111V20ZM11.1111 0V6.66667H20V0H11.1111Z"
            fill="#8F8F8F"
          />
        </svg>
      ),
    },
    {
      to: '#',
      text: 'Solicitudes',
      svg: (
        <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20V2C20 0.9 19.1 0 18 0ZM16 12H4V10H16V12ZM16 9H4V7H16V9ZM16 6H4V4H16V6Z"
          fill="#8F8F8F"
        />
      </svg>
      ),
      submenu:[{
        to:'/',
        text: 'Constancias de Trabajo',
      },
      {
        to:'/',
        text: 'Recibos de Pago',
      },
      {
        to:'/',
        text: 'Anticipo de Vacaciones',
      },
      {
        to:'/',
        text: 'Vacaciones',
      },
    ]
    },
    {
      to: '#',
      text: 'Impuestos',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M430 3415v-215h2770v430H430v-215zM430 2560v-210h2770v420H430v-210zM3630 2240v-320h-640v-430h640V850h420v640h640v430h-640v640h-420v-320zM430 1705v-215h2130v430H430v-215z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
      submenu:[{
        to:'/',
        text: 'Planilla de Retención (ARS)',
      },
      {
        to:'/',
        text: 'Comprobante de Retención (ARC)',
      },
    ]
    },
    {
      to: '#',
      text: 'Solicitud de Personal',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M1970 5115c-8-2-49-9-90-15-306-50-629-258-804-519-92-138-165-313-197-476-20-102-18-359 4-462 54-254 169-466 348-640 82-81 157-139 237-185l54-31-102-38C776 2506 337 1919 280 1224c-13-165-13-668 0-716 6-20 22-46 37-58 26-20 31-20 1338-20h1313l34-42c168-205 385-330 650-374 279-46 585 34 808 213 264 212 415 570 380 903-46 449-334 787-775 911-68 19-106 23-258 24l-179 1-53 73c-199 274-483 489-807 611l-99 37 66 39c100 58 236 176 313 270 407 500 370 1212-88 1664-235 233-553 363-880 359-52-1-102-3-110-4zm295-240c346-61 633-288 766-607 56-137 73-229 73-393-1-129-5-164-28-250-94-358-374-638-731-731-85-23-122-27-245-27-191-1-309 27-470 108-136 69-287 201-370 324-62 93-126 235-152 337-32 127-32 351 0 477 93 370 377 658 740 747 42 10 91 21 107 23 72 10 229 6 310-8zm176-2254c364-72 694-269 915-545l64-80-68-36c-241-126-426-339-511-589-72-210-73-451-2-666 13-40 15-58 7-61-6-2-537-3-1181-2l-1170 3-3 235c-4 347 17 520 88 726 196 560 701 962 1300 1034 129 15 440 5 561-19zm1574-797c290-78 514-310 590-609 24-94 24-275 1-370-25-100-105-259-170-336-154-185-378-289-621-289-138 0-235 23-360 84-163 80-290 207-371 371-58 119-75 187-81 326-8 188 30 335 127 484 114 173 304 304 500 344 30 6 64 13 75 15 41 10 252-4 310-20z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
      <path
        d="M3763 1554c-54-27-63-62-63-242v-161l-181-3-181-3-29-33c-44-50-38-122 15-164 18-15 45-18 199-18h177V764c0-188 9-222 65-248 41-20 59-20 100 0 56 26 65 60 65 248v166h352l34 34c46 46 48 101 5 148l-29 33-181 3-180 3-3 174-3 175-30 30c-38 38-88 47-132 24z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
      submenu:[{
        to:'',
        text:'Requisición de Personal',
      },
      {
        to:'',
        text:'Movimiento de Personal',
      },
      {
        to:'',
        text:'Captación de Personal',
      },]
    },
    {
      to: '/comentarios',
      text: 'Mis Prestamos',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M2325 5105c-22-8-41-15-43-15s-10-16-18-35c-10-24-14-77-15-177 0-79-4-181-8-227-6-76-9-85-38-111-17-15-80-46-139-70-232-89-365-170-500-305-198-198-294-443-294-756 0-287 80-481 284-685 175-174 364-285 776-452 352-144 440-192 539-296 111-118 136-266 69-406-88-181-367-278-683-236-228 30-434 91-660 195-115 53-134 58-166 41-31-17-55-76-118-294-77-264-86-314-67-359 43-103 332-218 733-291 79-15 154-31 167-37 43-20 49-51 55-279 9-316-3-305 331-305 338 0 323-15 330 330 3 167 9 247 18 262 22 39 75 70 177 103 325 105 573 314 715 603 213 434 126 932-225 1282-155 156-329 255-760 435-303 126-423 192-514 282-148 147-128 348 45 464 94 63 172 79 374 78 244-2 409-36 642-135 64-27 131-49 150-49 67 0 85 40 188 399 59 209 60 235 4 287-57 54-305 142-504 179-187 34-232 48-254 78-19 26-22 47-27 216-6 210-18 253-74 281-44 22-433 26-490 5z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
    },
    {
      to: '/Zona de Descarga',
      text: 'Zona de Descarga',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M2375 4909c-106-14-257-55-361-98-189-78-325-170-480-326-203-204-336-460-390-747l-18-98h-41c-69 0-227-28-308-54-288-95-523-299-661-573-212-424-126-943 214-1283 178-178 400-287 653-320 51-7 254-10 539-8 443 3 457 4 484 24 53 39 69 71 69 134s-16 95-69 134c-27 20-43 21-524 27-528 5-522 5-661 58-80 30-190 103-261 173-108 107-174 223-218 383-23 82-23 288 0 370 59 217 178 381 355 492 143 88 237 113 465 122 157 5 180 8 204 27 56 42 67 66 75 180 11 136 23 204 54 299 93 284 300 522 572 659 547 274 1218 45 1496-510 68-136 101-265 116-447 8-115 18-139 75-181 24-19 47-22 204-27 231-9 335-37 474-128 175-114 288-273 346-486 23-82 23-288 0-370-43-157-109-274-214-379-71-71-184-147-262-176-145-54-134-54-664-59-481-6-497-7-524-27-53-39-69-71-69-134s16-95 69-134c27-20 41-21 484-24 596-4 672 6 897 118 545 271 777 925 520 1468-114 240-287 418-522 536-133 66-329 116-460 116h-42l-6 48c-11 81-53 236-85 318-73 186-179 345-329 494-204 204-460 340-743 395-99 20-355 28-453 14z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
      <path
        d="M2495 2826c-37-17-70-52-84-89-8-19-11-351-11-1050V666l-202 201c-219 217-230 224-315 208-49-9-109-69-118-118-17-90-23-83 363-469s378-380 469-363c33 5 84 52 395 363 386 386 380 379 363 469-9 49-69 109-118 118-85 16-96 9-314-208l-203-201-2 1036c-3 1029-3 1037-24 1064-11 15-32 37-46 47-34 25-113 32-153 13z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
    },
    {
      to: '/Salon Virtual',
      text: 'Salon Virtual',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M2545 4936c-51-23-108-78-120-115l-6-21H1393c-776 0-1036-3-1067-12-55-16-138-99-154-154-9-30-12-163-12-473v-432l25-24c32-33 78-33 110 0l25 24v862l25 24 24 25h2031v-160H529l-24-25-25-24V2129l25-24 24-25h3742l24 25 25 24v1071h160V1969l-25-24-24-25H369l-24 25-25 24v1102l-25 24c-32 33-78 33-110 0l-25-24v-552c0-404 3-563 12-593 16-55 99-138 154-154 60-18 4088-18 4148 0 55 16 138 99 154 154 9 31 12 203 12 658v616h56c31 0 75 5 98 12 55 16 138 99 154 154 17 59 17 1369 0 1428-16 55-99 138-154 154-31 9-302 12-1120 12H2595l-50-24zm2230-161l25-24V3409l-25-24-24-25H3331l-223-191-223-190-5 171c-6 217-1 210-162 210-102 0-110 1-133 25l-25 24v1342l25 24 24 25h2142l24-25zm-2375-917v-463l24-51c27-59 90-116 145-132 21-7 64-12 95-12h56v-215c0-216 0-216 25-240 51-52 60-46 365 215l280 240h770v-960H2564l-11 71c-37 239-242 409-494 409h-59v203l39 42c76 82 121 205 121 327 0 55 3 68 15 68 9 0 27 11 40 25 25 24 25 27 25 187 0 113-5 182-15 221-45 173-178 307-350 352-80 20-310 20-390 0-178-47-321-197-355-374-5-30-10-123-10-208 0-150 1-155 25-178 13-14 31-25 40-25 12 0 15-13 15-68 0-122 45-245 121-327l39-42v-203h-62c-250-1-454-171-491-410l-11-70H640v2080h1760v-462zm-505 112c64-31 124-92 154-155 19-40 25-72 29-155l5-105-66 63c-44 42-73 62-90 62-14 0-62-20-108-44-46-25-127-59-179-77-83-29-111-33-227-37l-133-4v104c0 164 37 251 137 320 75 51 111 58 278 55 136-2 155-5 200-27zm103-670c-4-122-25-177-93-245-66-67-125-90-225-89-100 0-160 24-226 89-61 61-87 124-92 221l-4 81 103 6c122 6 245 39 364 96l80 39 48-47 49-46-4-105zm-318-493c58 0 117 5 133 11l27 12v-94c0-85-2-95-25-120-69-74-201-74-270 0-23 25-25 35-25 120v94l28-12c15-6 74-11 132-11zm-249-301c70-77 128-100 249-100 122 0 179 23 251 101l50 55 92-4c71-3 103-9 142-28 95-46 168-143 181-243l7-47h-722c-680 0-721 1-721 18 1 83 62 192 136 243 63 43 114 58 207 58l78 1 50-54z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
      <path
        d="M3305 4535l-25-24v-862l25-24c14-15 35-25 52-25 19 1 140 71 368 213 269 168 342 218 349 240 22 60 13 68-349 294-230 144-349 213-368 213-16 0-38-10-52-25zm340-327c107-68 195-125 195-128 0-5-372-240-392-248-4-2-8 109-8 247s2 251 5 251 93-55 200-122zM185 3495c-22-21-25-33-25-95s3-74 25-95c15-16 36-25 55-25s40 9 55 25c22 21 25 33 25 95s-3 74-25 95c-15 16-36 25-55 25s-40-9-55-25zM786 1590c-63-16-153-70-197-117-22-24-55-74-72-111-31-65-32-71-32-202 0-135 0-136 35-205 19-39 36-73 38-76 2-4-13-10-32-13-116-22-261-140-316-258-39-83-50-147-50-285 0-108 1-115 25-138l24-25h1342l24 25c24 23 25 30 25 147 0 191-35 292-138 400-57 60-161 121-228 134-19 3-34 9-32 13 2 3 19 37 38 76 35 69 35 70 35 205v136l-37 76c-68 136-188 217-336 224-42 2-94-1-116-6zm177-166c59-20 121-82 141-141 21-60 21-186 0-246-32-96-141-165-243-155-95 9-178 74-207 160-21 64-16 218 9 265 57 108 182 157 300 117zm292-733c114-56 176-155 183-288l5-83H320v63c0 122 46 216 136 278 82 56 99 58 439 56 307-2 311-2 360-26zM2466 1590c-63-16-153-70-197-117-22-24-55-74-72-111-31-65-32-71-32-202 0-135 0-136 35-205 19-39 36-73 38-76 2-4-13-10-32-13-67-13-171-74-228-134-103-108-138-209-138-400 0-117 1-124 25-147l24-25h1342l24 25c24 23 25 30 25 147 0 191-35 292-138 400-57 60-161 121-228 134-19 3-34 9-32 13 2 3 19 37 38 76 35 69 35 70 35 205v136l-37 76c-68 136-188 217-336 224-42 2-94-1-116-6zm177-166c59-20 121-82 141-141 9-27 16-80 16-123 0-97-21-158-71-209-123-123-340-73-395 91-21 64-16 218 9 265 57 108 182 157 300 117zm289-731c60-27 127-95 158-158 17-36 25-72 28-132l5-83H2000v63c0 122 46 216 136 278 82 56 99 58 439 56 295-2 312-3 357-24zM4146 1590c-63-16-153-70-197-117-22-24-55-74-72-111-31-65-32-71-32-202 0-135 0-136 35-205 19-39 36-73 38-76 2-4-13-10-32-13-67-13-171-74-228-134-103-108-138-209-138-400 0-117 1-124 25-147l24-25h1342l24 25c24 23 25 30 25 147 0 191-35 292-138 400-57 60-161 121-228 134-19 3-34 9-32 13 2 3 19 37 38 76 35 69 35 70 35 205v136l-37 76c-68 136-188 217-336 224-42 2-94-1-116-6zm177-166c59-20 121-82 141-141 9-27 16-80 16-123 0-97-21-158-71-209-122-121-339-73-393 87-21 59-21 185 0 245 41 121 179 185 307 141zm302-739c111-57 175-167 175-302v-63H3680v63c0 121 47 217 137 279 81 55 99 57 439 55l310-2 59-30z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
    },
    {
      to: '/',
      text: 'Retornar Intranet',
      svg: (
        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      version="1"
      viewBox="0 0 512 512"
    >
      <path
        d="M787 4064c-301-251-547-459-547-464 0-6 958-810 1082-908 14-11 29 2 118 108 86 102 100 124 89 134-8 7-138 116-289 241s-284 236-295 247c-20 18 3 19 1210 15 1213-3 1231-3 1315-24 255-63 462-178 627-345 121-123 181-204 245-333 96-189 132-349 132-575s-36-386-132-575c-64-129-124-210-245-333-165-167-372-281-627-345-84-21-96-21-1537-24l-1453-4V559l1463 4c1460 3 1462 3 1562 25 373 82 687 267 916 540 181 217 295 456 351 737 32 157 32 433 0 590-130 654-606 1133-1267 1277-99 21-114 22-1339 27l-1238 6 288 240c158 132 297 247 308 256 19 16 16 20-83 138-56 66-103 121-104 121-2 0-249-205-550-456z"
        transform="matrix(.1 0 0 -.1 0 512)"
        fill="#8F8F8F"
      ></path>
    </svg>
      ),
    },
  ];