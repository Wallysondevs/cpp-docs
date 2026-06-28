# std::chrono::duration_cast

Definido no cabeçalho `[<chrono>](<#/doc/header/chrono>)`

```c
template< class ToDuration, class Rep, class Period >
constexpr ToDuration duration_cast( const std::chrono::duration<Rep, Period>& d );
```

Converte uma [std::chrono::duration](<#/doc/chrono/duration>) para uma duração de tipo diferente `ToDuration`.

A função participa da resolução de sobrecarga apenas se `ToDuration` for uma especialização de [std::chrono::duration](<#/doc/chrono/duration>).

Seja

*   `ToRep` o typename ToDuration::rep,
*   `ToPeriod` o typename ToDuration::period,
*   `CF` o [std::ratio_divide](<#/doc/numeric/ratio/ratio_divide>)<Period, ToPeriod>,
*   `CR` o [std::common_type](<#/doc/types/common_type>)<Rep, ToRep, [std::intmax_t](<#/doc/types/integer>)>::type,
*   `cr_count` o static_cast&lt;CR&gt;(d.count()),
*   `cr_num` o static_cast&lt;CR&gt;(CF::num), e
*   `cr_den` o static_cast&lt;CR&gt;(CF::den),

o resultado é:

| CF::num
---|---
1 | não 1
CF::den | 1 | ToDuration(static_cast&lt;ToRep&gt;
(d.count())) | ToDuration(static_cast&lt;ToRep&gt;
(cr_count * cr_num))
não 1 | ToDuration(static_cast&lt;ToRep&gt;
---|---
(cr_count / cr_den)) | ToDuration(static_cast&lt;ToRep&gt;
(cr_count * cr_num / cr_den))

### Parâmetros

- **d** — duração a ser convertida

### Valor de retorno

`d` convertido para uma duração do tipo `ToDuration`.

### Notas

Nenhuma conversão implícita é usada. Multiplicações e divisões são evitadas sempre que possível, se for conhecido em tempo de compilação que um ou mais parâmetros são 1. Os cálculos são feitos no tipo mais amplo disponível e convertidos, como se por [`static_cast`](<#/doc/language/static_cast>), para o tipo de resultado apenas quando finalizados.

A conversão (casting) entre durações inteiras onde o período de origem é exatamente divisível pelo período alvo (por exemplo, horas para minutos) ou entre durações de ponto flutuante pode ser realizada com casts comuns ou implicitamente via [construtores de std::chrono::duration](<#/doc/chrono/duration/duration>), nenhum `duration_cast` é necessário.

A conversão (casting) de uma duração de ponto flutuante para uma duração inteira está [sujeita a comportamento indefinido](<#/doc/language/implicit_cast>) quando o valor de ponto flutuante é NaN, infinito ou muito grande para ser representável pelo tipo inteiro do alvo. Caso contrário, a conversão para uma duração inteira está sujeita a truncamento, assim como qualquer static_cast para um tipo inteiro.

### Exemplo

Este exemplo mede o tempo de execução de uma função.

Execute este código
```cpp
    #include <chrono>
    #include <iostream>
    #include <ratio>
    #include <thread>
    
    void f()
    {
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }
    
    int main()
    {
        const auto t1 = std::chrono::high_resolution_clock::now();
        f();
        const auto t2 = std::chrono::high_resolution_clock::now();
    
        // duração de ponto flutuante: nenhum duration_cast necessário
        const std::chrono::duration<double, std::milli> fp_ms = t2 - t1;
    
        // duração inteira: requer duration_cast
        const auto int_ms = std::chrono::duration_cast<std::chrono::milliseconds>(t2 - t1);
    
        // convertendo duração inteira para duração inteira de
        // unidade de tempo divisível mais curta: nenhum duration_cast necessário
        const std::chrono::duration<long, std::micro> int_usec = int_ms;
    
        std::cout << "f() took " << fp_ms << ", or "
                  << int_ms << " (whole milliseconds), or "
                  << int_usec << " (whole microseconds)\n";
    }
```

Saída possível:
```
    f() took 1000.14ms, or 1000ms (whole milliseconds), or 1000000us (whole microseconds)
```

### Veja também

[ duration](<#/doc/chrono/duration>)(C++11) | um intervalo de tempo
---|---
(modelo de classe) |
[ time_point_cast](<#/doc/chrono/time_point/time_point_cast>)(C++11) | converte um time_point para outro time_point no mesmo clock, com uma duração diferente
(modelo de função) |
[ floor(std::chrono::duration)](<#/doc/chrono/duration/floor>)(C++17) | converte uma duração para outra, arredondando para baixo
(modelo de função) |
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte uma duração para outra, arredondando para cima
(modelo de função) |
[ round(std::chrono::duration)](<#/doc/chrono/duration/round>)(C++17) | converte uma duração para outra, arredondando para o mais próximo, empates para o par
(modelo de função) |