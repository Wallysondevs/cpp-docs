# std::asctime

Definido no cabeçalho `[<ctime>](<#/doc/header/ctime>)`

```c
char* asctime( const std::tm* time_ptr );
```

Converte o tempo de calendário [std::tm](<#/doc/chrono/c/tm>) fornecido para uma representação textual no seguinte formato fixo de 25 caracteres: Www Mmm dd hh:mm:ss yyyy\n.

  * `Www` \- dia da semana abreviado em inglês com três letras de time_ptr->tm_wday, um de `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`.
  * `Mmm` \- nome do mês abreviado em inglês com três letras de time_ptr->tm_mon, um de `Jan`, `Feb`, `Mar`, `Apr`, `May`, `Jun`, `Jul`, `Aug`, `Sep`, `Oct`, `Nov`, `Dec`.
  * `dd` \- dia do mês com 2 dígitos de timeptr->tm_mday como se impresso por sprintf usando %2d.
  * `hh` \- hora com 2 dígitos de timeptr->tm_hour como se impresso por sprintf usando %.2d.
  * `mm` \- minuto com 2 dígitos de timeptr->tm_min como se impresso por sprintf usando %.2d.
  * `ss` \- segundo com 2 dígitos de timeptr->tm_sec como se impresso por sprintf usando %.2d.
  * `yyyy` \- ano com 4 dígitos de timeptr->tm_year + 1900 como se impresso por sprintf usando %4d.

O comportamento é indefinido se qualquer membro de *time_ptr estiver fora de seu intervalo normal.

O comportamento é indefinido se o ano de calendário indicado por time_ptr->tm_year tiver mais de 4 dígitos ou for menor que o ano 1000.

A função não suporta localização, e o caractere de nova linha não pode ser removido.

A função modifica armazenamento estático e não é thread-safe.

### Parâmetros

time_ptr | \- | ponteiro para um objeto [std::tm](<#/doc/chrono/c/tm>) especificando o tempo a ser impresso

### Valor de retorno

Ponteiro para uma string de caracteres estática terminada em nulo contendo a representação textual de data e hora. A string pode ser compartilhada entre `std::asctime` e [std::ctime](<#/doc/chrono/c/ctime>), e pode ser sobrescrita a cada invocação de qualquer uma dessas funções.

### Notas

Esta função retorna um ponteiro para dados estáticos e não é thread-safe. POSIX marca esta função como obsoleta e recomenda [std::strftime](<#/doc/chrono/c/strftime>) dependente de locale em seu lugar. Em [std::locale](<#/doc/locale/locale>)`("C")`, a string de formato "%c\n" de [std::strftime](<#/doc/chrono/c/strftime>) será uma correspondência exata com a saída de `std::asctime`, enquanto em outros locales a string de formato "%a %b %e %H:%M:%S %Y\n" será uma correspondência potencialmente mais próxima, mas nem sempre exata.

POSIX limita comportamentos indefinidos apenas aos casos em que a string de saída seria mais longa que 25 caracteres, quando `timeptr->tm_wday` ou `timeptr->tm_mon` não estão dentro dos intervalos esperados, ou quando `timeptr->tm_year` excede INT_MAX-1990.

Algumas implementações tratam timeptr->tm_mday == 0 como significando o último dia do mês anterior.

### Exemplo

Execute este código
```cpp
    #include <ctime>
    #include <iomanip>
    #include <iostream>
    
    int main()
    {
        const std::time_t now = std::time(nullptr);
    
        for (const char* localeName : {"C", "en_US.utf8", "de_DE.utf8", "ja_JP.utf8"})
        {
            std::cout << "locale " << localeName << ":\n" << std::left;
            std::locale::global(std::locale(localeName));
    
            std::cout << std::setw(40) << "    asctime" << std::asctime(std::localtime(&now));
    
            // strftime output for comparison:
            char buf[64];
            if (strftime(buf, sizeof buf, "%c\n", std::localtime(&now)))
                std::cout << std::setw(40) << "    strftime %c" << buf;
    
            if (strftime(buf, sizeof buf, "%a %b %e %H:%M:%S %Y\n", std::localtime(&now)))
                std::cout << std::setw(40) << "    strftime %a %b %e %H:%M:%S %Y" << buf;
    
            std::cout << '\n';
        }
    }
```

Saída possível:
```
    locale C:
        asctime                             Wed Nov  4 00:45:01 2020
        strftime %c                         Wed Nov  4 00:45:01 2020
        strftime %a %b %e %H:%M:%S %Y       Wed Nov  4 00:45:01 2020
    
    locale en_US.utf8:
        asctime                             Wed Nov  4 00:45:01 2020
        strftime %c                         Wed 04 Nov 2020 12:45:01 AM UTC
        strftime %a %b %e %H:%M:%S %Y       Wed Nov  4 00:45:01 2020
    
    locale de_DE.utf8:
        asctime                             Wed Nov  4 00:45:01 2020
        strftime %c                         Mi 04 Nov 2020 00:45:01 UTC
        strftime %a %b %e %H:%M:%S %Y       Mi Nov  4 00:45:01 2020
    
    locale ja_JP.utf8:
        asctime                             Wed Nov  4 00:45:01 2020
        strftime %c                         2020年11月04日 00時45分01秒
        strftime %a %b %e %H:%M:%S %Y       水 11月  4 00:45:01 2020
```

### Veja também

[ ctime](<#/doc/chrono/c/ctime>) | converte um objeto [std::time_t](<#/doc/chrono/c/time_t>) para uma representação textual
(function)
[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual personalizada
(function)
[ put_time](<#/doc/io/manip/put_time>)(desde C++11) | formata e exibe um valor de data/hora de acordo com o formato especificado
(function template)
[C documentation](<#/>) para asctime