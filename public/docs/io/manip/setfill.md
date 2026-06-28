# std::setfill

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
template< class CharT >
/*unspecified*/ setfill( CharT c );
```

Quando usado em uma expressão `out << setfill(c)`, define o caractere de preenchimento do stream `out` para `c`.

### Parâmetros

- **c** — novo valor para o caractere de preenchimento

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `out` for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << setfill(c)`
    *   tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    *   tem o valor `out`
    *   se comporta como se chamasse `f(out, c)`

onde a função `f` é definida como:
```cpp
    template<class CharT, class Traits>
    void f(std::basic_ios<CharT, Traits>& str, CharT c)
    {
        // define o caractere de preenchimento
        str.fill(c);
    }
```

### Observações

O caractere de preenchimento atual pode ser obtido com [std::ostream::fill](<#/doc/io/basic_ios/fill>).

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        std::cout << "default fill: " << [std::setw(10) << 42 << "]\n"
                  << "setfill('*'): [" << std::setfill('*')
                                       << std::setw(10) << 42 << "]\n";
    }
```

Saída:
```
    default fill: [        42]
    setfill('*'): [********42]
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98 | `setbase` só podia ser usado com streams do tipo [std::ostream](<#/doc/io/basic_ostream>) | utilizável com qualquer stream de caracteres de saída

### Veja também

[ fill](<#/doc/io/basic_ios/fill>) | gerencia o caractere de preenchimento
(função membro pública de `std::basic_ios<CharT,Traits>`)
[ internalleftright](<#/doc/io/manip/left>) | define o posicionamento dos caracteres de preenchimento
(função)
[ setw](<#/doc/io/manip/setw>) | altera a largura do próximo campo de entrada/saída
(função)