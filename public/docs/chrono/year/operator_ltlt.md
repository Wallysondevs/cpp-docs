# std::chrono::operator&lt;&lt;(std::chrono::year)

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class CharT, class Traits >
std::basic_ostream<CharT, Traits>&
operator<<( std::basic_ostream<CharT, Traits>& os, const std::chrono::year& y );
```

Forma uma [std::basic_string](<#/doc/string/basic_string>)&lt;CharT&gt; s consistindo do valor do ano armazenado em y formatado como um número decimal, preenchido à esquerda com ​0​ para quatro dígitos se o resultado for, de outra forma, menor que quatro dígitos. Em seguida, se !y.ok(), anexa " is not a valid year" à string formatada. Insere essa string em os.

Equivalente a

```cpp
return os << (y.ok() ?
std::format(STATICALLY_WIDEN<CharT>("{:%Y}"), y) :
std::format(STATICALLY_WIDEN<CharT>("{:%Y} is not a valid year"), y));
```

onde STATICALLY_WIDEN&lt;CharT&gt;("...") é "..." se `CharT` for `char`, e L"..." se `CharT` for `wchar_t`.

### Valor de retorno

os

### Exemplo

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
     
    int main()
    {
        constexpr std::chrono::year y1{2020}, y2{-020}, y3{98304};
        std::cout << y1 << '\n'
                  << y2 << '\n'
                  << y3 << '\n';
    }
```

Saída possível:
```
    2020
    -0016
    -32768 is not a valid year
```

### Veja também

[ format](<#/doc/utility/format/format>)(C++20) | armazena a representação formatada dos argumentos em uma nova string
(modelo de função)
[ std::formatter<std::chrono::year>](<#/doc/chrono/year/formatter>)(C++20) | suporte de formatação para `year`
(especialização de modelo de classe)