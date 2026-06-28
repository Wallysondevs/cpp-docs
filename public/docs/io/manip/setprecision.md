# std::setprecision

Definido no cabeçalho `[<iomanip>](<#/doc/header/iomanip>)`

```c
/*unspecified*/ setprecision( int n );
```

  
Quando usado em uma expressão out << setprecision(n) ou in >> setprecision(n), define o parâmetro `precision` do stream out ou in para exatamente n.

### Parâmetros

n  |  \-  |  novo valor para a precisão   
  
### Valor de retorno

Um objeto de tipo não especificado tal que 

  * se out é um objeto do tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>, a expressão out << setprecision(n)
    * tem o tipo [std::basic_ostream](<#/doc/io/basic_ostream>)<CharT, Traits>&
    * tem o valor out
    * se comporta como se chamasse f(out, n)
  * se in é um objeto do tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>, a expressão in >> setprecision(n)
    * tem o tipo [std::basic_istream](<#/doc/io/basic_istream>)<CharT, Traits>&
    * tem o valor in
    * se comporta como se chamasse f(in, n)

onde a função f é definida como: 
```
    void f(std::ios_base& str, int n)
    {
        // set precision
        str.precision(n);
    }
```

### Exemplo

Execute este código
```
    #include <iomanip>
    #include <iostream>
    #include <limits>
    #include <numbers>
     
    int main()
    {
        constexpr long double pi{std::numbers::pi_v<long double>};
     
        const auto default_precision{std::cout.precision()};
        constexpr auto max_precision{std::numeric_limits<long double>::digits10 + 1}; 
     
        std::cout << "default precision: " << default_precision << '\n'
                  << "maximum precision: " << max_precision << "\n\n"
                     "precision: pi:\n";
     
        for (int p{0}; p <= max_precision; ++p)
            std::cout << std::setw(2) << p << "  " << std::setprecision(p) << pi << '\n';
     
        std::cout << std::setprecision(default_precision); // restore defaults
    }
```

Saída: 
```
    default precision: 6
    maximum precision: 19
     
    precision: pi:
     0  3
     1  3
     2  3.1
     3  3.14
     4  3.142
     5  3.1416
     6  3.14159
     7  3.141593
     8  3.1415927
     9  3.14159265
    10  3.141592654
    11  3.1415926536
    12  3.14159265359
    13  3.14159265359
    14  3.1415926535898
    15  3.14159265358979
    16  3.141592653589793
    17  3.1415926535897932
    18  3.14159265358979324
    19  3.141592653589793239
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 183](<https://cplusplus.github.io/LWG/issue183>) | C++98  | `setprecision` só podia ser usado com streams  
do tipo [std::ostream](<#/doc/io/basic_ostream>) ou [std::istream](<#/doc/io/basic_istream>) | utilizável com qualquer  
stream de caracteres   
  
### Veja também

[ fixedscientifichexfloatdefaultfloat](<#/doc/io/manip/fixed>)(desde C++11)(desde C++11) |  altera a formatação usada para I/O de ponto flutuante   
(função)  
[ precision](<#/doc/io/ios_base/precision>) |  gerencia a precisão decimal de operações de ponto flutuante   
(função membro pública de `std::ios_base`)