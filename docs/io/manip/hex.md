# std::dec, std::hex, std::oct

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& dec( std::ios_base& str );
std::ios_base& hex( std::ios_base& str );
std::ios_base& oct( std::ios_base& str );
```

Modifica a base numérica padrão para E/S de inteiros.

1) Define o `basefield` do stream str para `dec` como se chamasse str.setf([std::ios_base::dec](<#/doc/io/ios_base/fmtflags>), [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>)).

2) Define o `basefield` do stream str para `hex` como se chamasse str.setf([std::ios_base::hex](<#/doc/io/ios_base/fmtflags>), [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>)).

3) Define o `basefield` do stream str para `oct` como se chamasse str.setf([std::ios_base::oct](<#/doc/io/ios_base/fmtflags>), [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S. Ele pode ser chamado com uma expressão como `out << std::hex` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::hex` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```cpp
    #include <bitset>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::cout << "The number 42 in octal:   " << std::oct << 42 << '\n'
                  << "The number 42 in decimal: " << std::dec << 42 << '\n'
                  << "The number 42 in hex:     " << std::hex << 42 << '\n';
        int n;
        std::istringstream("2A") >> std::hex >> n;
        std::cout << std::dec << "Parsing \"2A\" as hex gives " << n << '\n';
        // the output base is sticky until changed
        std::cout << std::hex << "42 as hex gives " << 42
            << " and 21 as hex gives " << 21 << '\n';
    
        // Note: there is no I/O manipulator that sets up a stream to print out
        // numbers in binary format (e.g. bin). If binary output is necessary
        // the std::bitset trick can be used:
        std::cout << "The number 42 in binary:  " << std::bitset<8>{42} << '\n';
    }
```

Saída:
```
    The number 42 in octal:   52
    The number 42 in decimal: 42
    The number 42 in hex:     2a
    Parsing "2A" as hex gives 42
    42 as hex gives 2a and 21 as hex gives 15
    The number 42 in binary:  00101010
```

### Veja também

[ setbase](<#/doc/io/manip/setbase>) | altera a base usada para E/S de inteiros
(função)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se um prefixo é usado para indicar a base numérica
(função)