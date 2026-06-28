# std::uppercase, std::nouppercase

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& uppercase( std::ios_base& str );
std::ios_base& nouppercase( std::ios_base& str );
```

Habilita o uso de caracteres maiúsculos na saída de ponto flutuante e inteiros hexadecimais. Não tem efeito na entrada.

1) Habilita a flag `uppercase` no stream str como se chamasse str.setf([std::ios_base::uppercase](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita a flag `uppercase` no stream str como se chamasse str.unsetf([std::ios_base::uppercase](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S, ele pode ser chamado com uma expressão como out << std::uppercase para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como in >> std::uppercase para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    int main()
    {
        std::cout << std::hex << std::showbase
                  << "0x2a with uppercase: " << std::uppercase << 0x2a << '\n'
                  << "0x2a with nouppercase: " << std::nouppercase << 0x2a << '\n'
                  << "1e-10 with uppercase: " << std::uppercase << 1e-10 << '\n'
                  << "1e-10 with nouppercase: " << std::nouppercase << 1e-10 << '\n';
    }
```

Saída:
```
    0x2a with uppercase: 0X2A
    0x2a with nouppercase: 0x2a
    1e-10 with uppercase: 1E-10
    1e-10 with nouppercase: 1e-10
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa as flags ios_base especificadas
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define as flags `ios_base` especificadas
(função)