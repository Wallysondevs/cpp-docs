# std::fixed, std::scientific, std::hexfloat, std::defaultfloat

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& fixed( std::ios_base& str );
std::ios_base& scientific( std::ios_base& str );
std::ios_base& hexfloat( std::ios_base& str );
std::ios_base& defaultfloat( std::ios_base& str );
```

Modifica a formatação padrão para saída de ponto flutuante.

1) Define o `floatfield` do stream str para `fixed` como se chamasse str.setf([std::ios_base::fixed](<#/doc/io/ios_base/fmtflags>), [std::ios_base::floatfield](<#/doc/io/ios_base/fmtflags>)).

2) Define o `floatfield` do stream str para `scientific` como se chamasse str.setf([std::ios_base::scientific](<#/doc/io/ios_base/fmtflags>), [std::ios_base::floatfield](<#/doc/io/ios_base/fmtflags>)).

3) Define o `floatfield` do stream str para `fixed` e `scientific` simultaneamente como se chamasse str.setf([std::ios_base::fixed](<#/doc/io/ios_base/fmtflags>) | [std::ios_base::scientific](<#/doc/io/ios_base/fmtflags>), [std::ios_base::floatfield](<#/doc/io/ios_base/fmtflags>)). Isso habilita a formatação hexadecimal de ponto flutuante.

4) Define o `floatfield` do stream str para zero, como se chamasse str.unsetf([std::ios_base::floatfield](<#/doc/io/ios_base/fmtflags>)). Isso habilita a formatação padrão de ponto flutuante, que é diferente de fixed e scientific.

Este é um manipulador de E/S, ele pode ser chamado com uma expressão como `out << std::fixed` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) (ou com uma expressão como `in >> std::scientific` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>)).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Notas

A formatação hexadecimal de ponto flutuante ignora a especificação de precisão do stream, conforme exigido pela especificação de [std::num_put::do_put](<#/doc/locale/num_put/put>).

Esses manipuladores não afetam a análise (parsing) de ponto flutuante.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    enum class cap { title, middle, end };
    
    void print(const char* text, double num, cap c)
    {
        if (c == cap::title)
            std::cout <<
                "┌──────────┬────────────┬──────────────────────────┐\n"
                "│  number  │   iomanip  │      representation      │\n"
                "├──────────┼────────────┼──────────────────────────┤\n";
        std::cout << std::left
             << "│ " << std::setw(8) << text <<      " │ fixed      │ "
             << std::setw(24) << std::fixed  << num <<            " │\n"
             << "│ " << std::setw(8) << text <<      " │ scientific │ "
             << std::setw(24) << std::scientific << num <<        " │\n"
             << "│ " << std::setw(8) << text <<      " │ hexfloat   │ "
             << std::setw(24) << std::hexfloat << num <<          " │\n"
             << "│ " << std::setw(8) << text <<      " │ default    │ "
             << std::setw(24) << std::defaultfloat << num <<      " │\n";
        std::cout << (c != cap::end ?
                "├──────────┼────────────┼──────────────────────────┤\n" :
                "└──────────┴────────────┴──────────────────────────┘\n");
    }
    
    int main()
    {
        print("0.0", 0.0, cap::title);
        print("0.01", 0.01, cap::middle);
        print("0.00001", 0.00001, cap::end);
    
        // Note; choose clang for correct output
        double f;
        std::istringstream("0x1.8p+0") >> f;
        std::cout << "Parsing 0x1.8p+0 gives " << f << '\n';
    
        std::istringstream("0x1P-1022") >> f;
        std::cout << "Parsing 0x1P-1022 gives " << f << '\n';
    }
```

Saída:
```
    ┌──────────┬────────────┬──────────────────────────┐
    │  number  │   iomanip  │      representation      │
    ├──────────┼────────────┼──────────────────────────┤
    │ 0.0      │ fixed      │ 0.000000                 │
    │ 0.0      │ scientific │ 0.000000e+00             │
    │ 0.0      │ hexfloat   │ 0x0p+0                   │
    │ 0.0      │ default    │ 0                        │
    ├──────────┼────────────┼──────────────────────────┤
    │ 0.01     │ fixed      │ 0.010000                 │
    │ 0.01     │ scientific │ 1.000000e-02             │
    │ 0.01     │ hexfloat   │ 0x1.47ae147ae147bp-7     │
    │ 0.01     │ default    │ 0.01                     │
    ├──────────┼────────────┼──────────────────────────┤
    │ 0.00001  │ fixed      │ 0.000010                 │
    │ 0.00001  │ scientific │ 1.000000e-05             │
    │ 0.00001  │ hexfloat   │ 0x1.4f8b588e368f1p-17    │
    │ 0.00001  │ default    │ 1e-05                    │
    └──────────┴────────────┴──────────────────────────┘
    Parsing 0x1.8p+0 gives 1.5
    Parsing 0x1P-1022 gives 2.22507e-308
```

### Veja também

[ setprecision](<#/doc/io/manip/setprecision>) | altera a precisão de ponto flutuante
(função)