# std::ctime

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
char* ctime( const std::time_t* time );
```

Converte o tempo dado desde a epoch para um tempo local de calendário e então para uma representação textual, como se chamasse [std::asctime](<#/doc/chrono/c/asctime>)([std::localtime](<#/doc/chrono/c/localtime>)(time)). A string resultante tem o seguinte formato:
```
    Www Mmm dd hh:mm:ss yyyy\n
```

  * `Www` - o dia da semana (um de `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`).
  * `Mmm` - o mês (um de `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`).
  * `dd` - o dia do mês.
  * `hh` - horas.
  * `mm` - minutos.
  * `ss` - segundos.
  * `yyyy` - anos.

A função não suporta localização.

### Parâmetros

- **time** — ponteiro para um objeto [std::time_t](<#/doc/chrono/c/time_t>) especificando o tempo a ser impresso

### Valor de retorno

Ponteiro para uma string de caracteres estática terminada em nulo contendo a representação textual de data e hora. A string pode ser compartilhada entre [std::asctime](<#/doc/chrono/c/asctime>) e `std::ctime`, e pode ser sobrescrita a cada invocação de qualquer uma dessas funções.

### Observações

Esta função retorna um ponteiro para dados estáticos e não é thread-safe. Além disso, ela modifica o objeto estático [std::tm](<#/doc/chrono/c/tm>) que pode ser compartilhado com [std::gmtime](<#/doc/chrono/c/gmtime>) e [std::localtime](<#/doc/chrono/c/localtime>). POSIX marca esta função como obsoleta e recomenda [std::strftime](<#/doc/chrono/c/strftime>) em seu lugar.

O comportamento pode ser indefinido para valores de [std::time_t](<#/doc/chrono/c/time_t>) que resultem em uma string com mais de 25 caracteres (por exemplo, ano 10000).

### Exemplo

Execute este código
```
    #include <cassert>
    #include <cstring>
    #include <ctime>
    #include <iostream>
    
    int main()
    {
        std::time_t result = std::time(nullptr);
        std::cout << std::ctime(&result);
    
        char buffer[32];
        std::strncpy(buffer, std::ctime(&result), 26);
        assert('\n' == buffer[std::strlen(buffer) - 1]);
        std::cout << buffer;
    }
```

Saída possível:
```
    Mon Oct 11 17:10:55 2021
    Mon Oct 11 17:10:55 2021
```

### Veja também

[ asctime](<#/doc/chrono/c/asctime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual
(função)
[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual personalizada
(função)
[ put_time](<#/doc/io/manip/put_time>)(C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(template de função)
[Documentação C](<#/>) para ctime