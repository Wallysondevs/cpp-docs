# std::to_wstring

Definido no cabeçalho `[<string>](<#/doc/header/string>)`

```c
std::wstring to_wstring( int value );
std::wstring to_wstring( long value );
std::wstring to_wstring( long long value );
std::wstring to_wstring( unsigned value );
std::wstring to_wstring( unsigned long value );
std::wstring to_wstring( unsigned long long value );
std::wstring to_wstring( float value );
std::wstring to_wstring( double value );
std::wstring to_wstring( long double value );
```

Converte um valor numérico para [std::wstring](<#/doc/string/basic_string>).

Seja `_buf_` um buffer interno às funções de conversão, suficientemente grande para conter o resultado da conversão.
1) Converte um inteiro decimal com sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%d", value).
2) Converte um inteiro decimal com sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%ld", value).
3) Converte um inteiro decimal com sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%lld", value).
4) Converte um inteiro decimal sem sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%u", value).
5) Converte um inteiro decimal sem sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%lu", value).
6) Converte um inteiro decimal sem sinal para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%llu", value).
7,8) Converte um valor de ponto flutuante para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%f", value).
9) Converte um valor de ponto flutuante para uma wide string como se por [std::swprintf](<#/doc/io/c/fwprintf>)(buf, sz, L"%Lf", value). | (até C++26)
---|---
1-9) Converte um valor numérico para uma wide string como se por [std::format](<#/doc/utility/format/format>)(L"{}", value). | (desde C++26)

### Parâmetros

- **value** — um valor numérico para converter

### Valor de retorno

Uma wide string contendo o valor convertido.

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) do construtor de [std::wstring](<#/doc/string/basic_string>).

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
     
    int main()
    {
        for (const double f : {23.43, 1e-9, 1e40, 1e-40, 123456789.0})
            std::wcout << "std::wcout: " << f << '\n'
                       << "to_wstring: " << std::to_wstring(f) << "\n\n";
    }
```

Saída:
```
    std::wcout: 23.43
    to_wstring: 23.430000
     
    std::wcout: 1e-09
    to_wstring: 0.000000
     
    std::wcout: 1e+40
    to_wstring: 10000000000000000303786028427003666890752.000000
     
    std::wcout: 1e-40
    to_wstring: 0.000000
     
    std::wcout: 1.23457e+08
    to_wstring: 123456789.000000
```

### Veja também

[ to_string](<#/doc/string/basic_string/to_string>)(C++11) | converte um valor integral ou de ponto flutuante para `string`
(função)