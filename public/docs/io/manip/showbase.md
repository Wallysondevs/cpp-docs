# std::showbase, std::noshowbase

Definido no cabeçalho `[<ios>](<#/doc/header/ios>)`

```c
std::ios_base& showbase( std::ios_base& str );
std::ios_base& noshowbase( std::ios_base& str );
```

1) Habilita o flag `showbase` no stream str como se chamasse str.setf([std::ios_base::showbase](<#/doc/io/ios_base/fmtflags>)).

2) Desabilita o flag `showbase` no stream str como se chamasse str.unsetf([std::ios_base::showbase](<#/doc/io/ios_base/fmtflags>)).

Este é um manipulador de E/S, pode ser chamado com uma expressão como `out << std::showbase` para qualquer `out` do tipo [std::basic_ostream](<#/doc/io/basic_ostream>) ou com uma expressão como `in >> std::showbase` para qualquer `in` do tipo [std::basic_istream](<#/doc/io/basic_istream>).

O flag `showbase` afeta o comportamento da saída de inteiros (veja [std::num_put::put](<#/doc/locale/num_put/put>)), entrada monetária (veja [std::money_get::get](<#/doc/locale/money_get/get>)) e saída monetária (veja [std::money_put::put](<#/doc/locale/money_put/put>)).

### Parâmetros

- **str** — referência para stream de E/S

### Valor de retorno

str (referência para o stream após a manipulação).

### Notas

Conforme especificado em [std::num_put::put](<#/doc/locale/num_put/put>), o flag showbase na saída de inteiros age como o especificador de formato `#` em [std::printf](<#/doc/io/c/printf>), o que significa que o prefixo da base numérica _não_ é adicionado ao exibir o valor zero.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <locale>
    #include <sstream>
    
    int main()
    {
        // showbase affects the output of octals and hexadecimals
        std::cout << std::hex
                  << "showbase: " << std::showbase << 42 << '\n'
                  << "noshowbase: " << std::noshowbase << 42 << '\n';
    
        // and both input and output of monetary values
        std::locale::global(std::locale("en_US.UTF8"));
        long double val = 0;
        std::istringstream("3.14") >> std::showbase >> std::get_money(val);
        std::cout << "With showbase, parsing 3.14 as money gives " << val << '\n';
        std::istringstream("3.14") >> std::noshowbase >> std::get_money(val);
        std::cout << "Without showbase, parsing 3.14 as money gives " << val << '\n';
    }
```

Saída:
```
    showbase: 0x2a
    noshowbase: 2a
    With showbase, parsing 3.14 as money gives 0
    Without showbase, parsing 3.14 as money gives 314
```

### Veja também

[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa os flags ios_base especificados
(função)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define os flags `ios_base` especificados
(função)