# Cabeçalho da biblioteca padrão &lt;ratio&gt; (C++11)

Este cabeçalho faz parte da biblioteca de [aritmética racional em tempo de compilação](<#/doc/numeric/ratio>).

### Classes

---
[ ratio](<#/doc/numeric/ratio/ratio>)(C++11) | representa uma fração racional exata
(class template)

##### Aritmética

[ ratio_add](<#/doc/numeric/ratio/ratio_add>)(C++11) | adiciona dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_subtract](<#/doc/numeric/ratio/ratio_subtract>)(C++11) | subtrai dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_multiply](<#/doc/numeric/ratio/ratio_multiply>)(C++11) | multiplica dois objetos `ratio` em tempo de compilação
(alias template)
[ ratio_divide](<#/doc/numeric/ratio/ratio_divide>)(C++11) | divide dois objetos `ratio` em tempo de compilação
(alias template)

##### Comparação

[ ratio_equal](<#/doc/numeric/ratio/ratio_equal>)(C++11) | compara dois objetos `ratio` quanto à igualdade em tempo de compilação
(class template)
[ ratio_not_equal](<#/doc/numeric/ratio/ratio_not_equal>)(C++11) | compara dois objetos `ratio` quanto à desigualdade em tempo de compilação
(class template)
[ ratio_less](<#/doc/numeric/ratio/ratio_less>)(C++11) | compara dois objetos `ratio` quanto a ser _menor que_ em tempo de compilação
(class template)
[ ratio_less_equal](<#/doc/numeric/ratio/ratio_less_equal>)(C++11) | compara dois objetos `ratio` quanto a ser _menor ou igual a_ em tempo de compilação
(class template)
[ ratio_greater](<#/doc/numeric/ratio/ratio_greater>)(C++11) | compara dois objetos `ratio` quanto a ser _maior que_ em tempo de compilação
(class template)
[ ratio_greater_equal](<#/doc/numeric/ratio/ratio_greater_equal>)(C++11) | compara dois objetos `ratio` quanto a ser _maior ou igual a_ em tempo de compilação
(class template)

##### Aliases de Tipo

---
`quecto` (C++26) | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000000000>, se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador
---|---
`ronto` (C++26) | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000000>, se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador
`yocto` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000000>, se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador
`zepto` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000000>, se [std::intmax_t](<#/doc/types/integer>) puder representar o denominador
`atto` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000000>
`femto` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000000>
`pico` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000000>
`nano` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000000>
`micro` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000000>
`milli` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 1000>
`centi` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 100>
`deci` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1, 10>
`deca` | [std::ratio](<#/doc/numeric/ratio/ratio>)<10, 1>
`hecto` | [std::ratio](<#/doc/numeric/ratio/ratio>)<100, 1>
`kilo` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000, 1>
`mega` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000, 1>
`giga` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000, 1>
`tera` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000, 1>
`peta` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000, 1>
`exa` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000, 1>
`zetta` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000, 1>, se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador
`yotta` | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000, 1>, se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador
`ronna` (C++26) | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000000, 1>, se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador
`quetta` (C++26) | [std::ratio](<#/doc/numeric/ratio/ratio>)<1000000000000000000000000000000, 1>, se [std::intmax_t](<#/doc/types/integer>) puder representar o numerador

### Sinopse
```cpp
    namespace std {
        // class template ratio
        template <intmax_t N, intmax_t D = 1>
        class ratio {
        public:
            typedef ratio<num, den> type;
            static constexpr intmax_t num;
            static constexpr intmax_t den;
        };
    
        // ratio arithmetic            
        template <class R1, class   R2> using   ratio_add      = /*ratio*/;
        template <class R1, class   R2> using   ratio_subtract = /*ratio*/;
        template <class R1, class   R2> using   ratio_multiply = /*ratio*/;
        template <class R1, class   R2> using   ratio_divide   = /*ratio*/;
    
        // ratio comparison            
        template <class R1, class R2> struct ratio_equal;           
        template <class R1, class R2> struct ratio_not_equal;           
        template <class R1, class R2> struct ratio_less;      
        template <class R1, class R2> struct ratio_less_equal;          
        template <class R1, class R2> struct ratio_greater;         
        template <class R1, class R2> struct ratio_greater_equal;  
    
        // convenience SI typedefs
        typedef ratio<1, 1000000000000000000000000000000> quecto;
        typedef ratio<1,    1000000000000000000000000000> ronto;         
        typedef ratio<1,       1000000000000000000000000> yocto;
        typedef ratio<1,          1000000000000000000000> zepto;
        typedef ratio<1,             1000000000000000000> atto;   
        typedef ratio<1,                1000000000000000> femto;  
        typedef ratio<1,                   1000000000000> pico;   
        typedef ratio<1,                      1000000000> nano;   
        typedef ratio<1,                         1000000> micro;  
        typedef ratio<1,                            1000> milli;  
        typedef ratio<1,                             100> centi;  
        typedef ratio<1,                              10> deci;   
        typedef ratio<                             10, 1> deca;   
        typedef ratio<                            100, 1> hecto;  
        typedef ratio<                           1000, 1> kilo;   
        typedef ratio<                        1000000, 1> mega;   
        typedef ratio<                     1000000000, 1> giga;   
        typedef ratio<                  1000000000000, 1> tera;   
        typedef ratio<               1000000000000000, 1> peta;   
        typedef ratio<            1000000000000000000, 1> exa;    
        typedef ratio<         1000000000000000000000, 1> zetta;
        typedef ratio<      1000000000000000000000000, 1> yotta;
        typedef ratio<   1000000000000000000000000000, 1> ronna;
        typedef ratio<1000000000000000000000000000000, 1> quetta;
    }
```