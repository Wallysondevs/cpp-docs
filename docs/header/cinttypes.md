# Cabeçalho da biblioteca padrão &lt;cinttypes&gt; (C++11)

Este cabeçalho estava originalmente na biblioteca padrão C como [`<inttypes.h>`](<#/>).

### Inclui

---
[ &lt;cstdint&gt;](<#/doc/header/cstdint>)(C++11) | [Tipos inteiros de largura fixa](<#/doc/types/integer>) e [limites de outros tipos](<#/doc/types/climits>)

### Tipos

[ imaxdiv_t](<#/doc/numeric/math/div>)(C++11) | tipo de estrutura, retornado por [std::imaxdiv](<#/doc/numeric/math/div>)
(typedef)

### Funções

[ abs(std::intmax_t)imaxabs](<#/doc/numeric/math/abs>)(C++11)(C++11) | calcula o valor absoluto de um valor integral (\\(\small{|x|}\\)|x|)
(function)
[ div(std::intmax_t)imaxdiv](<#/doc/numeric/math/div>)(C++11)(C++11) | calcula o quociente e o resto da divisão inteira
(function)
[ strtoimaxstrtoumax](<#/doc/string/byte/strtoimax>)(C++11)(C++11) | converte uma string de bytes para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(function)
[ wcstoimaxwcstoumax](<#/doc/string/wide/wcstoimax>)(C++11)(C++11) | converte uma wide string para [std::intmax_t](<#/doc/types/integer>) ou [std::uintmax_t](<#/doc/types/integer>)
(function)

### Macros

##### Constantes de formato para a família de funções [std::fprintf](<#/doc/io/c/printf>)

PRId8PRId16PRId32PRId64PRIdLEAST8PRIdLEAST16PRIdLEAST32PRIdLEAST64PRIdFAST8PRIdFAST16PRIdFAST32PRIdFAST64PRIdMAXPRIdPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro decimal com sinal do tipo [std::int8_t](<#/doc/types/integer>), [std::int16_t](<#/doc/types/integer>), [std::int32_t](<#/doc/types/integer>), [std::int64_t](<#/doc/types/integer>), [std::int_least8_t](<#/doc/types/integer>), [std::int_least16_t](<#/doc/types/integer>), [std::int_least32_t](<#/doc/types/integer>), [std::int_least64_t](<#/doc/types/integer>), [std::int_fast8_t](<#/doc/types/integer>), [std::int_fast16_t](<#/doc/types/integer>), [std::int_fast32_t](<#/doc/types/integer>), [std::int_fast64_t](<#/doc/types/integer>), [std::intmax_t](<#/doc/types/integer>), [std::intptr_t](<#/doc/types/integer>) respectivamente, equivalente a `d` para int
(macro constant)
PRIi8PRIi16PRIi32PRIi64PRIiLEAST8PRIiLEAST16PRIiLEAST32PRIiLEAST64PRIiFAST8PRIiFAST16PRIiFAST32PRIiFAST64PRIiMAXPRIiPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro decimal com sinal do tipo [std::int8_t](<#/doc/types/integer>), [std::int16_t](<#/doc/types/integer>), [std::int32_t](<#/doc/types/integer>), [std::int64_t](<#/doc/types/integer>), [std::int_least8_t](<#/doc/types/integer>), [std::int_least16_t](<#/doc/types/integer>), [std::int_least32_t](<#/doc/types/integer>), [std::int_least64_t](<#/doc/types/integer>), [std::int_fast8_t](<#/doc/types/integer>), [std::int_fast16_t](<#/doc/types/integer>), [std::int_fast32_t](<#/doc/types/integer>), [std::int_fast64_t](<#/doc/types/integer>), [std::intmax_t](<#/doc/types/integer>), [std::intptr_t](<#/doc/types/integer>) respectivamente, equivalente a `i` para int
(macro constant)
PRIu8PRIu16PRIu32PRIu64PRIuLEAST8PRIuLEAST16PRIuLEAST32PRIuLEAST64PRIuFAST8PRIuFAST16PRIuFAST32PRIuFAST64PRIuMAXPRIuPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro decimal sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `u` para unsigned int
(macro constant)
PRIo8PRIo16PRIo32PRIo64PRIoLEAST8PRIoLEAST16PRIoLEAST32PRIoLEAST64PRIoFAST8PRIoFAST16PRIoFAST32PRIoFAST64PRIoMAXPRIoPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro octal sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `o` para unsigned int
(macro constant)
PRIx8PRIx16PRIx32PRIx64PRIxLEAST8PRIxLEAST16PRIxLEAST32PRIxLEAST64PRIxFAST8PRIxFAST16PRIxFAST32PRIxFAST64PRIxMAXPRIxPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro hexadecimal minúsculo sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `x` para unsigned int
(macro constant)
PRIX8PRIX16PRIX32PRIX64PRIXLEAST8PRIXLEAST16PRIXLEAST32PRIXLEAST64PRIXFAST8PRIXFAST16PRIXFAST32PRIXFAST64PRIXMAXPRIXPTR(C++11) | especificador de conversão de formato para exibir um valor inteiro hexadecimal maiúsculo sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `X` para unsigned int
(macro constant)

##### Constantes de formato para a família de funções [std::fscanf](<#/doc/io/c/scanf>)

SCNd8SCNd16SCNd32SCNd64SCNdLEAST8SCNdLEAST16SCNdLEAST32SCNdLEAST64SCNdFAST8SCNdFAST16SCNdFAST32SCNdFAST64SCNdMAXSCNdPTR(C++11) | especificador de conversão de formato para entrada de um valor inteiro decimal com sinal do tipo [std::int8_t](<#/doc/types/integer>), [std::int16_t](<#/doc/types/integer>), [std::int32_t](<#/doc/types/integer>), [std::int64_t](<#/doc/types/integer>), [std::int_least8_t](<#/doc/types/integer>), [std::int_least16_t](<#/doc/types/integer>), [std::int_least32_t](<#/doc/types/integer>), [std::int_least64_t](<#/doc/types/integer>), [std::int_fast8_t](<#/doc/types/integer>), [std::int_fast16_t](<#/doc/types/integer>), [std::int_fast32_t](<#/doc/types/integer>), [std::int_fast64_t](<#/doc/types/integer>), [std::intmax_t](<#/doc/types/integer>), [std::intptr_t](<#/doc/types/integer>) respectivamente, equivalente a `d` para int
(macro constant)
SCNi8SCNi16SCNi32SCNi64SCNiLEAST8SCNiLEAST16SCNiLEAST32SCNiLEAST64SCNiFAST8SCNiFAST16SCNiFAST32SCNiFAST64SCNiMAXSCNiPTR(C++11) | especificador de conversão de formato para entrada de um valor inteiro decimal/octal/hexadecimal com sinal do tipo [std::int8_t](<#/doc/types/integer>), [std::int16_t](<#/doc/types/integer>), [std::int32_t](<#/doc/types/integer>), [std::int64_t](<#/doc/types/integer>), [std::int_least8_t](<#/doc/types/integer>), [std::int_least16_t](<#/doc/types/integer>), [std::int_least32_t](<#/doc/types/integer>), [std::int_least64_t](<#/doc/types/integer>), [std::int_fast8_t](<#/doc/types/integer>), [std::int_fast16_t](<#/doc/types/integer>), [std::int_fast32_t](<#/doc/types/integer>), [std::int_fast64_t](<#/doc/types/integer>), [std::intmax_t](<#/doc/types/integer>), [std::intptr_t](<#/doc/types/integer>) respectivamente, equivalente a `i` para int
(macro constant)
SCNu8SCNu16SCNu32SCNu64SCNuLEAST8SCNuLEAST16SCNuLEAST32SCNuLEAST64SCNuFAST8SCNuFAST16SCNuFAST32SCNuFAST64SCNuMAXSCNuPTR(C++11) | especificador de conversão de formato para entrada de um valor inteiro decimal sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `u` para unsigned int
(macro constant)
SCNo8SCNo16SCNo32SCNo64SCNoLEAST8SCNoLEAST16SCNoLEAST32SCNoLEAST64SCNoFAST8SCNoFAST16SCNoFAST32SCNoFAST64SCNoMAXSCNoPTR(C++11) | especificador de conversão de formato para entrada de um valor inteiro octal sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `o` para unsigned int
(macro constant)
SCNx8SCNx16SCNx32SCNx64SCNxLEAST8SCNxLEAST16SCNxLEAST32SCNxLEAST64SCNxFAST8SCNxFAST16SCNxFAST32SCNxFAST64SCNxMAXSCNxPTR(C++11) | especificador de conversão de formato para entrada de um valor inteiro hexadecimal sem sinal do tipo [std::uint8_t](<#/doc/types/integer>), [std::uint16_t](<#/doc/types/integer>), [std::uint32_t](<#/doc/types/integer>), [std::uint64_t](<#/doc/types/integer>), [std::uint_least8_t](<#/doc/types/integer>), [std::uint_least16_t](<#/doc/types/integer>), [std::uint_least32_t](<#/doc/types/integer>), [std::uint_least64_t](<#/doc/types/integer>), [std::uint_fast8_t](<#/doc/types/integer>), [std::uint_fast16_t](<#/doc/types/integer>), [std::uint_fast32_t](<#/doc/types/integer>), [std::uint_fast64_t](<#/doc/types/integer>), [std::uintmax_t](<#/doc/types/integer>), [std::uintptr_t](<#/doc/types/integer>) respectivamente, equivalente a `x` para unsigned int
(macro constant)

### Sinopse
```cpp
    #include <cstdint>
    
    namespace std
    {
        using imaxdiv_t = /* see description */;
    
        constexpr intmax_t imaxabs(intmax_t j);
        constexpr imaxdiv_t imaxdiv(intmax_t numer, intmax_t denom);
        intmax_t strtoimax(const char* nptr, char** endptr, int base);
        uintmax_t strtoumax(const char* nptr, char** endptr, int base);
        intmax_t wcstoimax(const wchar_t* nptr, wchar_t** endptr, int base);
        uintmax_t wcstoumax(const wchar_t* nptr, wchar_t** endptr, int base);
    
        constexpr intmax_t abs(intmax_t);            // optional, see description
        constexpr imaxdiv_t div(intmax_t, intmax_t); // optional, see description
    }
    
    #define PRIdN /* see description */
    #define PRIiN /* see description */
    #define PRIoN /* see description */
    #define PRIuN /* see description */
    #define PRIxN /* see description */
    #define PRIXN /* see description */
    #define SCNdN /* see description */
    #define SCNiN /* see description */
    #define SCNoN /* see description */
    #define SCNuN /* see description */
    #define SCNxN /* see description */
    #define PRIdLEASTN /* see description */
    #define PRIiLEASTN /* see description */
    #define PRIoLEASTN /* see description */
    #define PRIuLEASTN /* see description */
    #define PRIxLEASTN /* see description */
    #define PRIXLEASTN /* see description */
    #define SCNdLEASTN /* see description */
    #define SCNiLEASTN /* see description */
    #define SCNoLEASTN /* see description */
    #define SCNuLEASTN /* see description */
    #define SCNxLEASTN /* see description */
    #define PRIdFASTN /* see description */
    #define PRIiFASTN /* see description */
    #define PRIoFASTN /* see description */
    #define PRIuFASTN /* see description */
    #define PRIxFASTN /* see description */
    #define PRIXFASTN /* see description */
    #define SCNdFASTN /* see description */
    #define SCNiFASTN /* see description */
    #define SCNoFASTN /* see description */
    #define SCNuFASTN /* see description */
    #define SCNxFASTN /* see description */
    #define PRIdMAX /* see description */
    #define PRIiMAX /* see description */
    #define PRIoMAX /* see description */
    #define PRIuMAX /* see description */
    #define PRIxMAX /* see description */
    #define PRIXMAX /* see description */
    #define SCNdMAX /* see description */
    #define SCNiMAX /* see description */
    #define SCNoMAX /* see description */
    #define SCNuMAX /* see description */
    #define SCNxMAX /* see description */
    #define PRIdPTR /* see description */
    #define PRIiPTR /* see description */
    #define PRIoPTR /* see description */
    #define PRIuPTR /* see description */
    #define PRIxPTR /* see description */
    #define PRIXPTR /* see description */
    #define SCNdPTR /* see description */
    #define SCNiPTR /* see description */
    #define SCNoPTR /* see description */
    #define SCNuPTR /* see description */
    #define SCNxPTR /* see description */
```