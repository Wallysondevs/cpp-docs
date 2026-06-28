# std::left, std::right, std::internal

Definido no header `[<ios>](<#/doc/header/ios>)`

```cpp
std::ios_base& left( std::ios_base& str );  // (1)
std::ios_base& right( std::ios_base& str );  // (2)
std::ios_base& internal( std::ios_base& str );  // (3)
```

Modifica o posicionamento dos caracteres de preenchimento em um stream de saída. `left` e `right` se aplicam a qualquer tipo sendo exibido, `internal` se aplica a saídas de inteiros, ponto flutuante e monetárias. Não tem efeito na entrada.

1) Define o `adjustfield` do stream str para `left` como se chamasse str.setf([std::ios_base::left](<#/doc/io/ios_base/fmtflags>), [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)).

2) Define o `adjustfield` do stream str para `right` como se chamasse str.setf([std::ios_base::right](<#/doc/io/ios_base/fmtflags>), [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)).

3) Define o `adjustfield` do stream str para `internal` como se chamasse str.setf([std::ios_base::internal](<#/doc/io/ios_base/fmtflags>), [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)).

O padrão inicial para streams padrão é equivalente a `right`.

Este é um manipulador de I/O. Pode ser chamado com uma expressão como `out << std::left` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::left` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

### Parâmetros

- **str** — referência para stream de I/O

### Valor de retorno

str (referência para o stream após a manipulação).

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::cout.imbue(std::locale("en_US.utf8"));
    
        std::cout << "Default positioning:\n" << std::setfill('*')
                  << std::setw(12) << -1.23  << '\n'
                  << std::setw(12) << std::hex << std::showbase << 42 << '\n'
                  << std::setw(12) << std::put_money(123, true) << "\n\n";
    
        std::cout << "Left positioning:\n" << std::left
                  << std::setw(12) << -1.23  << '\n'
                  << std::setw(12) << 42 << '\n'
                  << std::setw(12) << std::put_money(123, true) << "\n\n";
    
        std::cout << "Internal positioning:\n" << std::internal
                  << std::setw(12) << -1.23  << '\n'
                  << std::setw(12) << 42 << '\n'
                  << std::setw(12) << std::put_money(123, true) << "\n\n";
    
        std::cout << "Right positioning:\n" << std::right
                  << std::setw(12) << -1.23  << '\n'
                  << std::setw(12) << 42 << '\n'
                  << std::setw(12) << std::put_money(123, true) << '\n';
    }
```

Saída:
```
    Default positioning:
    *******-1.23
    ********0x2a
    ***USD *1.23
    
    Left positioning:
    -1.23*******
    0x2a********
    USD *1.23***
    
    Internal positioning:
    -*******1.23
    0x********2a
    USD ****1.23
    
    Right positioning:
    *******-1.23
    ********0x2a
    ***USD *1.23
```

### Veja também

[ setw](<#/doc/io/manip/setw>) | altera a largura do próximo campo de entrada/saída
(função)
[ setfill](<#/doc/io/manip/setfill>) | altera o caractere de preenchimento
(modelo de função)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se um prefixo é usado para indicar a base numérica
(função)