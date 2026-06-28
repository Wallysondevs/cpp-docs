# std::resetiosflags

Definido no header `[<iomanip>](<#/doc/header/iomanip>)`

```cpp
/*unspecified*/ resetiosflags( std::ios_base::fmtflags mask );
```

Quando usado em uma expressão `out << resetiosflags(mask)` ou `in >> resetiosflags(mask)`, limpa todas as flags de formato do stream `out` ou `in` conforme especificado pela `mask`.

### Parâmetros

- **mask** — bitmask das flags a serem limpas

### Valor de retorno

Um objeto de tipo não especificado tal que

*   se `out` for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão `out << resetiosflags(mask)`
    *   tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    *   tem o valor `out`
    *   se comporta como se chamasse `f(out, mask)`
*   se `in` for um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão `in >> resetiosflags(mask)`
    *   tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    *   tem o valor `in`
    *   se comporta como se chamasse `f(in, mask)`

onde a função `f` é definida como:
```cpp
    void f(std::ios_base& str, std::ios_base::fmtflags mask)
    {
        // reset specified flags
        str.setf(ios_base::fmtflags(0), mask);
    }
```

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::istringstream in("10 010 10 010 10 010");
        int n1, n2;
    
        in >> std::oct >> n1 >> n2;
        std::cout << "Parsing \"10 010\" with std::oct gives: " << n1 << ' ' << n2 << '\n';
    
        in >> std::dec >> n1 >> n2;
        std::cout << "Parsing \"10 010\" with std::dec gives: " << n1 << ' ' << n2 << '\n';
    
        in >> std::resetiosflags(std::ios_base::basefield) >> n1 >> n2;
        std::cout << "Parsing \"10 010\" with autodetect gives: " << n1 << ' ' << n2 << '\n';
    }
```

Saída:
```
    Parsing "10 010" with std::oct gives: 8 8
    Parsing "10 010" with std::dec gives: 10 10
    Parsing "10 010" with autodetect gives: 10 8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98 | `resetiosflags` só podia ser usado com streams do tipo [std::ostream](<#/doc/io/basic_ostream>) ou [std::istream](<#/doc/io/basic_istringstream>) | utilizável com qualquer character stream

### Veja também

[ setf](<#/doc/io/ios_base/setf>) | define uma flag de formato específica
(função membro pública de `std::ios_base`)
[ setiosflags](<#/doc/io/manip/setiosflags>) | define as flags `ios_base` especificadas
(função)