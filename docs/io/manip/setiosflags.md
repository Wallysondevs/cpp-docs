# std::setiosflags

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
/*não especificado*/ setiosflags( std::ios_base::fmtflags mask );
```

Quando usado em uma expressão `out << setiosflags(mask)` ou `in >> setiosflags(mask)`, define todas as flags de formato do stream `out` ou `in` conforme especificado pela `mask`.

### Parâmetros

- **mask** — bitmask das flags a serem definidas

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `out` for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << setiosflags(mask)`
    *   tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    *   tem o valor `out`
    *   se comporta como se chamasse `f(out, mask)`
*   se `in` for um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão `in >> setiosflags(mask)`
    *   tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    *   tem o valor `in`
    *   se comporta como se chamasse `f(in, mask)`

onde a função `f` é definida como:
```cpp
    void f(std::ios_base& str, std::ios_base::fmtflags mask)
    {
        // define as flags especificadas
        str.setf(mask);
    }
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
     
    int main()
    {
        std::cout << std::resetiosflags(std::ios_base::dec) 
                  << std::setiosflags(  std::ios_base::hex
                                      | std::ios_base::uppercase
                                      | std::ios_base::showbase) << 42 << '\n';
    }
```

Saída:
```
    0X2A
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98 | `setiosflags` só podia ser usado com streams do tipo [std::ostream](<#/doc/io/basic_ostream>) ou [std::istream](<#/doc/io/basic_istream>) | utilizável com qualquer stream de caracteres

### Veja também

[ setf](<#/doc/io/ios_base/setf>) | define uma flag de formato específica
(função membro pública de `std::ios_base`)
[ resetiosflags](<#/doc/io/manip/resetiosflags>) | limpa as flags ios_base especificadas
(função)