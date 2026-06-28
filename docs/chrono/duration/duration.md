# std::chrono::duration&lt;Rep,Period&gt;::duration

```cpp
constexpr duration() = default;  // (1) (desde C++11)
duration( const duration& ) = default;  // (2) (desde C++11)
template< class Rep2 >
constexpr explicit duration( const Rep2& r );  // (3) (desde C++11)
template< class Rep2, class Period2 >
constexpr duration( const duration<Rep2, Period2>& d );  // (4) (desde C++11)
```

  
Constrói um novo `duration` a partir de uma de várias fontes de dados opcionais. 

1) O construtor padrão.

2) O construtor de cópia.

3) Constrói um duration com r ticks.

Esta sobrecarga participa da resolução de sobrecarga apenas se todas as seguintes condições forem satisfeitas: 

  * is_convertible&lt;const Rep2&, Rep&gt;::value é true. 
  * Qualquer uma das seguintes condições é satisfeita:[1](<#/doc/chrono/duration/duration>)

    

  * [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)&lt;Rep&gt;::value é true. 
  * [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)&lt;Rep2&gt;::value é false.

4) Constrói um duration convertendo d para um período e contagem de ticks apropriados, como se por [std::chrono::duration_cast](<#/doc/chrono/duration/duration_cast>)&lt;duration&gt;(d).count().

Esta sobrecarga participa da resolução de sobrecarga apenas se nenhum overflow for induzido na conversão, e qualquer uma das seguintes condições for satisfeita:[2](<#/doc/chrono/duration/duration>)

  * [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)&lt;Rep&gt;::value é true. 
  * Todas as seguintes condições são satisfeitas: 

    

  * [std::ratio_divide](<#/doc/numeric/ratio/ratio_divide>)<Period2, Period>::den é 1. 
  * [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)&lt;Rep2&gt;::value é false.

  1. [↑](<#/doc/chrono/duration/duration>) Ou seja, um duration com uma contagem de ticks inteira não pode ser construído a partir de um valor de ponto flutuante, mas um duration com uma contagem de ticks de ponto flutuante pode ser construído a partir de um valor inteiro.
  2. [↑](<#/doc/chrono/duration/duration>) Ou seja, ou o duration usa ticks de ponto flutuante, ou `Period2` é exatamente divisível por `Period`.

### Parameters

r  |  \-  |  uma contagem de ticks   
---|---|---
d  |  \-  |  um duration para copiar   
  
### Exemplo

O código a seguir mostra vários exemplos (tanto válidos quanto inválidos) de como construir durations:

Execute este código
```cpp
    #include <chrono>
     
    int main()
    {
        std::chrono::hours h(1); // uma hora
        std::chrono::milliseconds ms{3}; // 3 milissegundos
        std::chrono::duration<int, std::kilo> ks(3); // 3000 segundos
     
        // erro: treat_as_floating_point<int>::value == false,
        // Este duration permite apenas contagens de ticks inteiras
    //  std::chrono::duration<int, std::kilo> d3(3.5);
     
        // relógio de 30Hz usando ticks fracionários
        std::chrono::duration<double, std::ratio<1, 30>> hz30(3.5);
     
        // 3000 microssegundos construídos a partir de 3 milissegundos
        std::chrono::microseconds us = ms;
        // erro: 1/1000000 não é divisível por 1/1000
    //  std::chrono::milliseconds ms2 = us
        std::chrono::duration<double, std::milli> ms2 = us; // 3.0 milissegundos
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 2094](<https://cplusplus.github.io/LWG/issue2094>) | C++11  | para a sobrecarga (4), [std::ratio_divide](<#/doc/numeric/ratio/ratio_divide>)<Period2, period>::num  
poderia causar overflow ao avaliar  
[std::ratio_divide](<#/doc/numeric/ratio/ratio_divide>)<Period2, period>::den | a sobrecarga (4) não  
participa da resolução de  
sobrecarga neste caso   
[LWG 3050](<https://cplusplus.github.io/LWG/issue3050>) | C++11  | restrição de convertibilidade usava xvalue não-const | usar lvalues const em vez disso   
  
### Veja também

[ operator=](<#/>) |  atribui o conteúdo   
(função membro pública)  