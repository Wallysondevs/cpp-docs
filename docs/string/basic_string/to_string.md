# std::to_string

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
std::string to_string( int value );
std::string to_string( long value );
std::string to_string( long long value );
std::string to_string( unsigned value );
std::string to_string( unsigned long value );
std::string to_string( unsigned long long value );
std::string to_string( float value );
std::string to_string( double value );
std::string to_string( long double value );
```

Converte um valor numérico para [std::string](<#/doc/string/basic_string>).

Seja `_buf_` um buffer interno às funções de conversão, suficientemente grande para conter o resultado da conversão.
1) Converte um inteiro com sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%d", value).
2) Converte um inteiro com sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%ld", value).
3) Converte um inteiro com sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%lld", value).
4) Converte um inteiro sem sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%u", value).
5) Converte um inteiro sem sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%lu", value).
6) Converte um inteiro sem sinal para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%llu", value).
7,8) Converte um valor de ponto flutuante para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%f", value).
9) Converte um valor de ponto flutuante para uma string como se por [std::sprintf](<#/doc/io/c/fprintf>)(buf, "%Lf", value). | (até C++26)
---|---
1-9) Converte um valor numérico para uma string como se por [std::format](<#/doc/utility/format/format>)("{}", value). | (desde C++26)

### Parâmetros

- **value** — um valor numérico para converter

### Valor de retorno

Uma string contendo o valor convertido.

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) do construtor de [std::string](<#/doc/string/basic_string>).

### Observações

* Com tipos de ponto flutuante, `std::to_string` pode produzir resultados inesperados, pois o número de dígitos significativos na string retornada pode ser zero, veja o exemplo.
* O valor de retorno pode diferir significativamente do que `std::cout` imprime por padrão, veja o exemplo.

* `std::to_string` depende da locale C atual para fins de formatação e, portanto, chamadas concorrentes a `std::to_string` de múltiplas threads podem resultar em serialização parcial das chamadas.
  * Os resultados das sobrecargas para tipos inteiros não dependem da locale C atual e, portanto, as implementações geralmente evitam o acesso à locale C atual nessas sobrecargas, tanto para correção quanto para desempenho. No entanto, tal evitação não é garantida pelo padrão.

| (até C++26)

C++17 fornece [`std::to_chars`](<#/doc/utility/to_chars>) como uma alternativa de maior desempenho e independente de locale.

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_to_string`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Redefinindo `std::to_string` em termos de [std::format](<#/doc/utility/format/format>)

### Exemplo

Execute este código
```cpp
    #include <cstdio>
    #include <format>
    #include <initializer_list>
    #include <iostream>
    #include <string>
    
    #if __cpp_lib_to_string >= 202306L
    constexpr auto revision() { return " (post C++26)"; }
    #else
    constexpr auto revision() { return " (pre C++26)"; }
    #endif
    
    int main()
    {
        for (const double f : {1.23456789555555, 23.43, 1e-9, 1e40, 1e-40, 123456789.0})
        {
            std::cout << "to_string:\t" << std::to_string(f) << revision() << '\n';
    
            // Before C++26, the output of std::to_string matches std::printf.
            std::printf("printf:\t\t%f\n", f);
    
            // As of C++26, the output of std::to_string matches std::format.
            std::cout << std::format("format:\t\t{}\n", f);
    
            std::cout << "std::cout:\t" << f << "\n\n";
        }
    }
```

Saída possível:
```
    to_string:      1.234568 (pre C++26)
    printf:         1.234568
    format:         1.23456789555555
    std::cout:      1.23457
    
    to_string:      23.430000 (pre C++26)
    printf:         23.430000
    format:         23.43
    std::cout:      23.43
    
    to_string:      0.000000 (pre C++26)
    printf:         0.000000
    format:         1e-09
    std::cout:      1e-09
    
    to_string:      10000000000000000303786028427003666890752.000000 (pre C++26)
    printf:         10000000000000000303786028427003666890752.000000
    format:         1e+40
    std::cout:      1e+40
    
    to_string:      0.000000 (pre C++26)
    printf:         0.000000
    format:         1e-40
    std::cout:      1e-40
    
    to_string:      123456789.000000 (pre C++26)
    printf:         123456789.000000
    format:         123456789
    std::cout:      1.23457e+08
```

### Veja também

[ to_wstring](<#/doc/string/basic_string/to_wstring>)(C++11) | converte um valor inteiro ou de ponto flutuante para `wstring`
(função)
[ stoulstoull](<#/doc/string/basic_string/stoul>)(C++11)(C++11) | converte uma string para um inteiro sem sinal
(função)
[ stoistolstoll](<#/doc/string/basic_string/stol>)(C++11)(C++11)(C++11) | converte uma string para um inteiro com sinal
(função)
[ stofstodstold](<#/doc/string/basic_string/stof>)(C++11)(C++11)(C++11) | converte uma string para um valor de ponto flutuante
(função)
[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(função)