# Palavra-chave C++: short

### Uso

  * [`short` modificador de tipo](<#/doc/language/types>)

### Exemplo

Execute este código
```cpp
    #include <climits>
    #include <concepts>
    #include <iostream>
    #include <limits>
    
    static_assert(sizeof(short) >= 16 / CHAR_BIT);
    static_assert(sizeof(unsigned short) >= 16 / CHAR_BIT);
    static_assert(std::numeric_limits<short>::min() <= -32'768); //'
    static_assert(std::numeric_limits<short>::max() >= 32'767); //'
    static_assert(std::numeric_limits<unsigned short>::max() >= 65'535u); //'
    
    // concepts are available since C++20
    static_assert(std::integral<short> and std::integral<unsigned short>);
    
    template <typename T, typename... Ts>
    concept all_same = (... and std::same_as <T, Ts>);
    
    static_assert(all_same<short, short int, signed short, signed short int>);
    static_assert(all_same<unsigned short, unsigned short int>);
    
    #define OUT(...) std::cout << #__VA_ARGS__ << " = " << __VA_ARGS__ << '\n'
    
    int main()
    {
        OUT(sizeof(short));
        OUT(sizeof(unsigned short));
        OUT(std::numeric_limits<short>::min());
        OUT(std::numeric_limits<short>::max());
        OUT(std::numeric_limits<unsigned short>::max());
    }
    
    #undef OUT
```

Saída possível:
```
    sizeof(short) = 2
    sizeof(unsigned short) = 2
    std::numeric_limits<short>::min() = -32768
    std::numeric_limits<short>::max() = 32767
    std::numeric_limits<unsigned short>::max() = 65535
```

### Veja também

  * [Tipos fundamentais](<#/doc/language/types>): [`void`](<#/doc/keyword/void>), [std::nullptr_t](<#/doc/types/nullptr_t>)(desde C++11).
    * [Tipos integrais](<#/doc/language/types>): [`int`](<#/doc/keyword/int>). [Modificadores](<#/doc/language/types>): [`signed`](<#/doc/keyword/signed>), [`unsigned`](<#/doc/keyword/unsigned>), `short` , [`long`](<#/doc/keyword/long>).
      * [Tipo booleano](<#/doc/language/types>): [`bool`](<#/doc/keyword/bool>). [Literais booleanos](<#/doc/language/bool_literal>): [`false`](<#/doc/keyword/false>), [`true`](<#/doc/keyword/true>).
      * [Tipos de caractere](<#/doc/language/types>): [`char`](<#/doc/keyword/char>), [`char8_t`](<#/doc/keyword/char8_t>)(desde C++20), [`char16_t`](<#/doc/keyword/char16_t>), [`char32_t`](<#/doc/keyword/char32_t>)(desde C++11), [`wchar_t`](<#/doc/keyword/wchar_t>).
    * [Tipos de ponto flutuante](<#/doc/language/types>): [`float`](<#/doc/keyword/float>), [`double`](<#/doc/keyword/double>).
