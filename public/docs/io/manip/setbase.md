# std::setbase

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
/*unspecified*/ setbase( int base );
```

Define a base numérica do stream. Quando usado em uma expressão out << setbase(base) ou in >> setbase(base), altera o flag `basefield` do stream out ou in, dependendo do valor de base:

  * o valor 16 define `basefield` para [std::ios_base::hex](<#/doc/io/ios_base/fmtflags>).
  * o valor 8 define [std::ios_base::oct](<#/doc/io/ios_base/fmtflags>).
  * o valor 10 define [std::ios_base::dec](<#/doc/io/ios_base/fmtflags>).

Valores de base diferentes de 8, 10 ou 16 redefinem `basefield` para zero, o que corresponde à saída decimal e entrada dependente de prefixo.

### Parâmetros

- **base** — novo valor para basefield

### Valor de retorno

Um objeto de tipo não especificado tal que

  * se out for um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão out << setbase(base)
    * tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    * tem o valor out
    * se comporta como se chamasse f(out, base)
  * se in for um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão in >> setbase(base)
    * tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    * tem o valor in
    * se comporta como se chamasse f(in, base)

onde a função f é definida como:
```cpp
    void f(std::ios_base& str, int base)
    {
        // set basefield
        str.setf(base == 8 ? std::ios_base::oct :
            base == 10 ? std::ios_base::dec :
            base == 16 ? std::ios_base::hex :
            std::ios_base::fmtflags(0), std::ios_base::basefield);
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
        std::cout << "Parsing string \"10 0x10 010\"\n";
    
        int n1, n2, n3;
        std::istringstream s("10 0x10 010");
    
        s >> std::setbase(16) >> n1 >> n2 >> n3;
        std::cout << "hexadecimal parse: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
    
        s.clear();
        s.seekg(0);
    
        s >> std::setbase(0) >> n1 >> n2 >> n3;
        std::cout << "prefix-dependent parse: " << n1 << ' ' << n2 << ' ' << n3 << '\n';
    
        std::cout << "hex output: " << std::setbase(16)
                  << std::showbase << n1 << ' ' << n2 << ' ' << n3 << '\n';
    }
```

Saída:
```
    Parsing string "10 0x10 010"
    hexadecimal parse: 16 16 16
    prefix-dependent parse: 10 16 8
    hex output: 0xa 0x10 0x8
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98 | `setbase` só podia ser usado com streams do tipo [std::ostream](<#/doc/io/basic_ostream>) ou [std::istream](<#/doc/io/basic_istream>) | utilizável com qualquer stream de caracteres

### Veja também

[ dechexoct](<#/doc/io/manip/hex>) | altera a base usada para E/S de inteiros
(função)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se o prefixo é usado para indicar a base numérica
(função)