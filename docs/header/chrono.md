# Header da biblioteca padrão &lt;chrono&gt;&nbsp;(C++11)

Este header faz parte da biblioteca de [data e hora](<#/doc/chrono>).

### Includes

---
[ &lt;compare&gt;](<#/doc/header/compare>)(C++20) | Suporte para [operador de comparação de três vias](<#/doc/language/operator_comparison>)

### Classes

##### Duration

Definido no namespace `std::chrono`
[ duration](<#/doc/chrono/duration>)(C++11) | um intervalo de tempo
(class template)
[ treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)(C++11) | indica que uma duration é conversível para duration com um período de tick diferente
(class template)
[ duration_values](<#/doc/chrono/duration_values>)(C++11) | constrói valores zero, mínimo e máximo de uma contagem de ticks de um dado tipo
(class template)

##### Typedefs de conveniência para duration

Definido no namespace `std::chrono`
[std::chrono::nanoseconds](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::nano](<#/doc/numeric/ratio/ratio>)
---|---
[std::chrono::microseconds](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::micro](<#/doc/numeric/ratio/ratio>)
[std::chrono::milliseconds](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::milli](<#/doc/numeric/ratio/ratio>)
[std::chrono::seconds](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<1>
[std::chrono::minutes](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<60>
[std::chrono::hours](<#/doc/chrono/duration>)(C++11) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<3600>
std::chrono::days(C++20) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<86400>
std::chrono::weeks(C++20) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<604800>
std::chrono::months(C++20) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<2629746>
std::chrono::years(C++20) | tipo de duration com Period [std::ratio](<#/doc/numeric/ratio/ratio>)<31556952>

##### Ponto no tempo

Definido no namespace `std::chrono`
[ time_point](<#/doc/chrono/time_point>)(C++11) | um ponto no tempo
(class template)
[ clock_time_conversion](<#/doc/chrono/clock_time_conversion>)(C++20) | classe de traits que define como converter pontos no tempo de um clock para outro
(class template)

##### Clocks

Definido no namespace `std::chrono`
[ is_clockis_clock_v](<#/doc/chrono/is_clock>)(C++20) | determina se um tipo é um [Clock](<#/doc/named_req/Clock>)
(class template) (variable template)
[ system_clock](<#/doc/chrono/system_clock>)(C++11) | tempo de relógio de parede do relógio em tempo real de todo o sistema
(class)
[ steady_clock](<#/doc/chrono/steady_clock>)(C++11) | relógio monotônico que nunca será ajustado
(class)
[ high_resolution_clock](<#/doc/chrono/high_resolution_clock>)(C++11) | o relógio com o menor período de tick disponível
(class)
[ utc_clock](<#/doc/chrono/utc_clock>)(C++20) | [Clock](<#/doc/named_req/Clock>) para Tempo Universal Coordenado (UTC)
(class)
[ tai_clock](<#/doc/chrono/tai_clock>)(C++20) | [Clock](<#/doc/named_req/Clock>) para Tempo Atômico Internacional (TAI)
(class)
[ gps_clock](<#/doc/chrono/gps_clock>)(C++20) | [Clock](<#/doc/named_req/Clock>) para tempo GPS
(class)
[ file_clock](<#/doc/chrono/file_clock>)(C++20) | [Clock](<#/doc/named_req/Clock>) usado para [tempo de arquivo](<#/doc/filesystem/file_time_type>)
(typedef)
[ local_t](<#/doc/chrono/local_t>)(C++20) | pseudo-clock representando o tempo local
(class)

##### Calendário

Definido no namespace `std::chrono`
[ last_spec](<#/doc/chrono/last_spec>)(C++20) | classe de tag que indica o _último_ dia ou dia da semana em um mês
(class)
[ day](<#/doc/chrono/day>)(C++20) | representa um dia de um mês
(class)
[ month](<#/doc/chrono/month>)(C++20) | representa um mês de um ano
(class)
[ year](<#/doc/chrono/year>)(C++20) | representa um ano no calendário Gregoriano
(class)
[ weekday](<#/doc/chrono/weekday>)(C++20) | representa um dia da semana no calendário Gregoriano
(class)
[ weekday_indexed](<#/doc/chrono/weekday_indexed>)(C++20) | representa o enésimo [`weekday`](<#/doc/chrono/weekday>) de um mês
(class)
[ weekday_last](<#/doc/chrono/weekday_last>)(C++20) | representa o último [`weekday`](<#/doc/chrono/weekday>) de um mês
(class)
[ month_day](<#/doc/chrono/month_day>)(C++20) | representa um [`day`](<#/doc/chrono/day>) específico de um [`month`](<#/doc/chrono/month>) específico
(class)
[ month_day_last](<#/doc/chrono/month_day_last>)(C++20) | representa o último dia de um [`month`](<#/doc/chrono/month>) específico
(class)
[ month_weekday](<#/doc/chrono/month_weekday>)(C++20) | representa o enésimo [`weekday`](<#/doc/chrono/weekday>) de um [`month`](<#/doc/chrono/month>) específico
(class)
[ month_weekday_last](<#/doc/chrono/month_weekday_last>)(C++20) | representa o último [`weekday`](<#/doc/chrono/weekday>) de um [`month`](<#/doc/chrono/month>) específico
(class)
[ year_month](<#/doc/chrono/year_month>)(C++20) | representa um [`month`](<#/doc/chrono/month>) específico de um [`year`](<#/doc/chrono/year>) específico
(class)
[ year_month_day](<#/doc/chrono/year_month_day>)(C++20) | representa um [`year`](<#/doc/chrono/year>), [`month`](<#/doc/chrono/month>) e [`day`](<#/doc/chrono/day>) específicos
(class)
[ year_month_day_last](<#/doc/chrono/year_month_day_last>)(C++20) | representa o último dia de um [`year`](<#/doc/chrono/year>) e [`month`](<#/doc/chrono/month>) específicos
(class)
[ year_month_weekday](<#/doc/chrono/year_month_weekday>)(C++20) | representa o enésimo [`weekday`](<#/doc/chrono/weekday>) de um [`year`](<#/doc/chrono/year>) e [`month`](<#/doc/chrono/month>) específicos
(class)
[ year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)(C++20) | representa o último [`weekday`](<#/doc/chrono/weekday>) de um [`year`](<#/doc/chrono/year>) e [`month`](<#/doc/chrono/month>) específicos
(class)

##### Hora do dia

Definido no namespace `std::chrono`
[ hh_mm_ss](<#/doc/chrono/hh_mm_ss>)(C++20) | representa uma hora do dia
(class template)

##### Fuso horário

Definido no namespace `std::chrono`
[ tzdb](<#/doc/chrono/tzdb>)(C++20) | descreve uma cópia do [banco de dados de fuso horário IANA](<https://www.iana.org/time-zones>)
(class)
[ tzdb_list](<#/doc/chrono/tzdb_list>)(C++20) | representa uma lista encadeada de [`tzdb`](<#/doc/chrono/tzdb>)
(class)
[ time_zone](<#/doc/chrono/time_zone>)(C++20) | representa um fuso horário
(class)
[ sys_info](<#/doc/chrono/sys_info>)(C++20) | representa informações sobre um fuso horário em um ponto no tempo específico
(class)
[ local_info](<#/doc/chrono/local_info>)(C++20) | representa informações sobre uma conversão de tempo local para tempo UNIX
(class)
[ choose](<#/doc/chrono/choose>)(C++20) | seleciona como um tempo local ambíguo deve ser resolvido
(enum)
[ zoned_traits](<#/doc/chrono/zoned_traits>)(C++20) | classe de traits para ponteiros de fuso horário usados por [`zoned_time`](<#/doc/chrono/zoned_time>)
(class template)
[ zoned_time](<#/doc/chrono/zoned_time>)(C++20) | representa um fuso horário e um ponto no tempo
(class)
[ time_zone_link](<#/doc/chrono/time_zone_link>)(C++20) | representa um nome alternativo para um fuso horário
(class)
[ nonexistent_local_time](<#/doc/chrono/nonexistent_local_time>)(C++20) | exceção lançada para relatar que um tempo local é inexistente
(class)
[ ambiguous_local_time](<#/doc/chrono/ambiguous_local_time>)(C++20) | exceção lançada para relatar que um tempo local é ambíguo
(class)

##### Segundo bissexto

Definido no namespace `std::chrono`
[ leap_second](<#/doc/chrono/leap_second>)(C++20) | contém informações sobre a inserção de um segundo bissexto
(class)
[ leap_second_info](<#/doc/chrono/utc_clock/leap_second_info>)(C++20) | informações de inserção de segundo bissexto
(class)

##### Especializações

Definido no namespace `std`
[ std::common_type<std::chrono::duration>](<#/doc/chrono/duration/common_type>)(C++11) | especializa o trait [std::common_type](<#/doc/types/common_type>)
(class template specialization)
[ std::common_type<std::chrono::time_point>](<#/doc/chrono/time_point/common_type>)(C++11) | especializa o trait [std::common_type](<#/doc/types/common_type>)
(class template specialization)
[ std::formatter<std::chrono::duration>](<#/doc/chrono/duration/formatter>)(C++20) | suporte a formatação para `duration`
(class template specialization)
[ std::formatter<std::chrono::sys_time>](<#/doc/chrono/system_clock/formatter>)(C++20) | suporte a formatação para `sys_time`
(class template specialization)
[ std::formatter<std::chrono::utc_time>](<#/doc/chrono/utc_clock/formatter>)(C++20) | suporte a formatação para `utc_time`
(class template specialization)
[ std::formatter<std::chrono::tai_time>](<#/doc/chrono/tai_clock/formatter>)(C++20) | suporte a formatação para `tai_time`
(class template specialization)
[ std::formatter<std::chrono::gps_time>](<#/doc/chrono/gps_clock/formatter>)(C++20) | suporte a formatação para `gps_time`
(class template specialization)
[ std::formatter<std::chrono::file_time>](<#/doc/chrono/file_clock/formatter>)(C++20) | suporte a formatação para `file_time`
(class template specialization)
[ std::formatter<std::chrono::local_time>](<#/doc/chrono/local_t/formatter>)(C++20) | suporte a formatação para `local_time`
(class template specialization)
[ std::formatter<std::chrono::day>](<#/doc/chrono/day/formatter>)(C++20) | suporte a formatação para `day`
(class template specialization)
[ std::formatter<std::chrono::month>](<#/doc/chrono/month/formatter>)(C++20) | suporte a formatação para `month`
(class template specialization)
[ std::formatter<std::chrono::year>](<#/doc/chrono/year/formatter>)(C++20) | suporte a formatação para `year`
(class template specialization)
[ std::formatter<std::chrono::weekday>](<#/doc/chrono/weekday/formatter>)(C++20) | suporte a formatação para `weekday`
(class template specialization)
[ std::formatter<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/formatter>)(C++20) | suporte a formatação para `weekday_indexed`
(class template specialization)
[ std::formatter<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/formatter>)(C++20) | suporte a formatação para `weekday_last`
(class template specialization)
[ std::formatter<std::chrono::month_day>](<#/doc/chrono/month_day/formatter>)(C++20) | suporte a formatação para `month_day`
(class template specialization)
[ std::formatter<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/formatter>)(C++20) | suporte a formatação para `month_day_last`
(class template specialization)
[ std::formatter<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/formatter>)(C++20) | suporte a formatação para `month_weekday`
(class template specialization)
[ std::formatter<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/formatter>)(C++20) | suporte a formatação para `month_weekday_last`
(class template specialization)
[ std::formatter<std::chrono::year_month>](<#/doc/chrono/year_month/formatter>)(C++20) | suporte a formatação para `year_month`
(class template specialization)
[ std::formatter<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/formatter>)(C++20) | suporte a formatação para `year_month_day`
(class template specialization)
[ std::formatter<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/formatter>)(C++20) | suporte a formatação para `year_month_day_last`
(class template specialization)
[ std::formatter<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/formatter>)(C++20) | suporte a formatação para `year_month_weekday`
(class template specialization)
[ std::formatter<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/formatter>)(C++20) | suporte a formatação para `year_month_weekday_last`
(class template specialization)
[ std::formatter<std::chrono::hh_mm_ss>](<#/doc/chrono/hh_mm_ss/formatter>)(C++20) | suporte a formatação para `hh_mm_ss`
(class template specialization)
[ std::formatter<std::chrono::sys_info>](<#/doc/chrono/sys_info/formatter>)(C++20) | suporte a formatação para `sys_info`
(class template specialization)
[ std::formatter<std::chrono::local_info>](<#/doc/chrono/local_info/formatter>)(C++20) | suporte a formatação para `local_info`
(class template specialization)
[ std::formatter<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/formatter>)(C++20) | suporte a formatação para `zoned_time`
(class template specialization)
[ std::hash<std::chrono::duration>](<#/doc/chrono/duration/hash>)(C++26) | suporte a hash para [`std::chrono::duration`](<#/doc/chrono/duration>)
(class template specialization)
[ std::hash<std::chrono::time_point>](<#/doc/chrono/time_point/hash>)(C++26) | suporte a hash para [`std::chrono::time_point`](<#/doc/chrono/time_point>)
(class template specialization)
[ std::hash<std::chrono::day>](<#/doc/chrono/day/hash>)(C++26) | suporte a hash para [`std::chrono::day`](<#/doc/chrono/day>)
(class template specialization)
[ std::hash<std::chrono::month>](<#/doc/chrono/month/hash>)(C++26) | suporte a hash para [`std::chrono::month`](<#/doc/chrono/month>)
(class template specialization)
[ std::hash<std::chrono::year>](<#/doc/chrono/year/hash>)(C++26) | suporte a hash para [`std::chrono::year`](<#/doc/chrono/year>)
(class template specialization)
[ std::hash<std::chrono::weekday>](<#/doc/chrono/weekday/hash>)(C++26) | suporte a hash para [`std::chrono::weekday`](<#/doc/chrono/weekday>)
(class template specialization)
[ std::hash<std::chrono::weekday_indexed>](<#/doc/chrono/weekday_indexed/hash>)(C++26) | suporte a hash para [`std::chrono::weekday_indexed`](<#/doc/chrono/weekday_indexed>)
(class template specialization)
[ std::hash<std::chrono::weekday_last>](<#/doc/chrono/weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::weekday_last`](<#/doc/chrono/weekday_last>)
(class template specialization)
[ std::hash<std::chrono::month_day>](<#/doc/chrono/month_day/hash>)(C++26) | suporte a hash para [`std::chrono::month_day`](<#/doc/chrono/month_day>)
(class template specialization)
[ std::hash<std::chrono::month_day_last>](<#/doc/chrono/month_day_last/hash>)(C++26) | suporte a hash para [`std::chrono::month_day_last`](<#/doc/chrono/month_day_last>)
(class template specialization)
[ std::hash<std::chrono::month_weekday>](<#/doc/chrono/month_weekday/hash>)(C++26) | suporte a hash para [`std::chrono::month_weekday`](<#/doc/chrono/month_weekday>)
(class template specialization)
[ std::hash<std::chrono::month_weekday_last>](<#/doc/chrono/month_weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::month_weekday_last`](<#/doc/chrono/month_weekday_last>)
(class template specialization)
[ std::hash<std::chrono::year_month>](<#/doc/chrono/year_month/hash>)(C++26) | suporte a hash para [`std::chrono::year_month`](<#/doc/chrono/year_month>)
(class template specialization)
[ std::hash<std::chrono::year_month_day>](<#/doc/chrono/year_month_day/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_day`](<#/doc/chrono/year_month_day>)
(class template specialization)
[ std::hash<std::chrono::year_month_day_last>](<#/doc/chrono/year_month_day_last/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_day_last`](<#/doc/chrono/year_month_day_last>)
(class template specialization)
[ std::hash<std::chrono::year_month_weekday>](<#/doc/chrono/year_month_weekday/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_weekday`](<#/doc/chrono/year_month_weekday>)
(class template specialization)
[ std::hash<std::chrono::year_month_weekday_last>](<#/doc/chrono/year_month_weekday_last/hash>)(C++26) | suporte a hash para [`std::chrono::year_month_weekday_last`](<#/doc/chrono/year_month_weekday_last>)
(class template specialization)
[ std::hash<std::chrono::zoned_time>](<#/doc/chrono/zoned_time/hash>)(C++26) | suporte a hash para [`std::chrono::zoned_time`](<#/doc/chrono/zoned_time>)
(class template specialization)
[ std::hash<std::chrono::leap_second>](<#/doc/chrono/leap_second/hash>)(C++26) | suporte a hash para [`std::chrono::leap_second`](<#/doc/chrono/leap_second>)
(class template specialization)

##### Declarações antecipadas

Definido no header `[<functional>](<#/doc/header/functional>)`
[ hash](<#/doc/utility/hash>)(C++11) | objeto de função hash
(class template)

### Funções

---

##### Duration

Definido no namespace `std::chrono`
[ operator+operator-operator*operator/operator%](<#/doc/chrono/duration/operator_arith4>)(C++11) | implementa operações aritméticas com durations como argumentos
(function template)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/duration/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara duas durations
(function template)
[ duration_cast](<#/doc/chrono/duration/duration_cast>)(C++11) | converte uma duration para outra, com um intervalo de tick diferente
(function template)
[ floor(std::chrono::duration)](<#/doc/chrono/duration/floor>)(C++17) | converte uma duration para outra, arredondando para baixo
(function template)
[ ceil(std::chrono::duration)](<#/doc/chrono/duration/ceil>)(C++17) | converte uma duration para outra, arredondando para cima
(function template)
[ round(std::chrono::duration)](<#/doc/chrono/duration/round>)(C++17) | converte uma duration para outra, arredondando para o mais próximo, empates para o par
(function template)
[ abs(std::chrono::duration)](<#/doc/chrono/duration/abs>)(C++17) | obtém o valor absoluto da duration
(function template)

##### Ponto no tempo

Definido no namespace `std::chrono`
[ operator+operator-](<#/doc/chrono/time_point/operator_arith2>)(C++11) | realiza operações de adição e subtração envolvendo um ponto no tempo
(function template)
[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/time_point/operator_cmp>)(C++11)(C++11)(removido em C++20)(C++11)(C++11)(C++11)(C++11)(C++20) | compara dois pontos no tempo
(function template)
[ time_point_cast](<#/doc/chrono/time_point/time_point_cast>)(C++11) | converte um ponto no tempo para outro ponto no tempo no mesmo clock, com uma duration diferente
(function template)
[ floor(std::chrono::time_point)](<#/doc/chrono/time_point/floor>)(C++17) | converte um time_point para outro, arredondando para baixo
(function template)
[ ceil(std::chrono::time_point)](<#/doc/chrono/time_point/ceil>)(C++17) | converte um time_point para outro, arredondando para cima
(function template)
[ round(std::chrono::time_point)](<#/doc/chrono/time_point/round>)(C++17) | converte um time_point para outro, arredondando para o mais próximo, empates para o par
(function template)
[ from_stream(std::chrono::sys_time)](<#/doc/chrono/system_clock/from_stream>)(C++20) | analisa um `sys_time` de um stream de acordo com o formato fornecido
(function template)
[ from_stream(std::chrono::utc_time)](<#/doc/chrono/utc_clock/from_stream>)(C++20) | analisa um `utc_time` de um stream de acordo com o formato fornecido
(function template)
[ from_stream(std::chrono::tai_time)](<#/doc/chrono/tai_clock/from_stream>)(C++20) | analisa um `tai_time` de um stream de acordo com o formato fornecido
(function template)
[ from_stream(std::chrono::gps_time)](<#/doc/chrono/gps_clock/from_stream>)(C++20) | analisa um `gps_time` de um stream de acordo com o formato fornecido
(function template)
[ from_stream(std::chrono::file_time)](<#/doc/chrono/file_clock/from_stream>)(C++20) | analisa um `file_time` de um stream de acordo com o formato fornecido
(function template)
[ from_stream(std::chrono::local_time)](<#/doc/chrono/local_t/from_stream>)(C++20) | analisa um `local_time` de um stream de acordo com o formato fornecido
(function template)
[ clock_cast](<#/doc/chrono/clock_cast>)(C++20) | converte pontos no tempo de um clock para outro
(function template)

##### Calendário

Definido no namespace `std::chrono`
[ operator==operator<=>](<#/doc/chrono/day/operator_cmp>)(C++20) | compara dois valores `day`
(function)
[ operator==operator<=>](<#/doc/chrono/month/operator_cmp>)(C++20) | compara dois valores `month`
(function)
[ operator==operator<=>](<#/doc/chrono/year/operator_cmp>)(C++20) | compara dois valores `year`
(function)
[ operator==](<#/doc/chrono/weekday/operator_cmp>)(C++20) | compara dois valores `weekday`
(function)
[ operator==](<#/doc/chrono/weekday_indexed/operator_cmp>)(C++20) | compara dois valores `weekday_indexed`
(function)
[ operator==](<#/doc/chrono/weekday_last/operator_cmp>)(C++20) | compara dois valores `weekday_last`
(function)
[ operator==operator<=>](<#/doc/chrono/month_day/operator_cmp>)(C++20) | compara dois valores `month_day`
(function)
[ operator==operator<=>](<#/doc/chrono/month_day_last/operator_cmp>)(C++20) | compara dois valores `month_day_last`
(function)
[ operator==](<#/doc/chrono/month_weekday/operator_cmp>)(C++20) | compara dois valores `month_weekday`
(function)
[ operator==](<#/doc/chrono/month_weekday_last/operator_cmp>)(C++20) | compara dois valores `month_weekday_last`
(function)
[ operator==operator<=>](<#/doc/chrono/year_month/operator_cmp>)(C++20) | compara dois valores `year_month`
(function)
[ operator==operator<=>](<#/doc/chrono/year_month_day/operator_cmp>)(C++20) | compara dois valores `year_month_day`
(function)
[ operator==operator<=>](<#/doc/chrono/year_month_day_last/operator_cmp>)(C++20) | compara dois valores `year_month_day_last`
(function)
[ operator==](<#/doc/chrono/year_month_weekday/operator_cmp>)(C++20) | compara dois valores `year_month_weekday`
(function)
[ operator==](<#/doc/chrono/year_month_weekday_last/operator_cmp>)(C++20) | compara dois valores `year_month_weekday_last`
(function)
[ operator+operator-](<#/doc/chrono/day/operator_arith_2>)(C++20) | adiciona ou subtrai um número de dias e um `day`, ou encontra a diferença entre dois `day`s
(function)
[ operator+operator-](<#/doc/chrono/month/operator_arith_2>)(C++20) | realiza aritmética em `month`s
(function)
[ operator+operator-](<#/doc/chrono/year/operator_arith_2>)(C++20) | realiza aritmética em `year`s
(function)
[ operator+operator-](<#/doc/chrono/weekday/operator_arith_2>)(C++20) | realiza aritmética em `weekday`s
(function)
[ operator+operator-](<#/doc/chrono/year_month/operator_arith_2>)(C++20) | realiza aritmética em `year_month`
(function)
[ operator+operator-](<#/doc/chrono/year_month_day/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day` e um número de anos ou meses
(function)
[ operator+operator-](<#/doc/chrono/year_month_day_last/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_day_last` e um número de anos ou meses
(function)
[ operator+operator-](<#/doc/chrono/year_month_weekday/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_weekday` e um número de anos ou meses
(function)
[ operator+operator-](<#/doc/chrono/year_month_weekday_last/operator_arith_2>)(C++20) | adiciona ou subtrai um `year_month_weekday_last` e um número de anos ou meses
(function)
[ operator/](<#/doc/chrono/operator_slash>)(C++20) | sintaxe convencional para criação de datas do calendário Gregoriano
(function)

##### Hora do dia

Definido no namespace `std::chrono`
[ is_amis_pmmake12make24](<#/doc/chrono/hour_fun>)(C++20) | traduz entre um formato de hora do dia de 12h/24h
(function)

##### Fuso horário

Definido no namespace `std::chrono`
[ get_tzdbget_tzdb_listreload_tzdbremote_version](<#/doc/chrono/tzdb_functions>)(C++20) | acessa e controla as informações do banco de dados global de fusos horários
(function)
[ locate_zone](<#/doc/chrono/locate_zone>)(C++20) | localiza um [`time_zone`](<#/doc/chrono/time_zone>) com base em seu nome
(function)
[ operator==operator<=>](<#/doc/chrono/time_zone/operator_cmp>)(C++20) | compara dois objetos `time_zone`
(function)
[ operator==](<#/doc/chrono/zoned_time/operator_cmp>)(C++20) | compara dois valores `zoned_time`
(function template)
[ operator==operator<=>](<#/doc/chrono/time_zone_link/operator_cmp>)(C++20) | compara dois objetos `time_zone_link`
(function)

##### Segundo bissexto

Definido no namespace `std::chrono`
[ get_leap_second_info](<#/doc/chrono/utc_clock/get_leap_second_info>)(C++20) | obtém informações de inserção de segundo bissexto de um objeto `utc_time`
(function template)
[ operator==operator<operator<=operator>operator>=operator<=>](<#/doc/chrono/leap_second/operator_cmp>)(C++20) | compara dois valores `leap_second` ou um valor `leap_second` e um sys_time
(function template)

##### E/S

Definido no namespace `std::chrono`
[ operator<<](<#/doc/chrono/duration/operator_ltlt>)(C++20) | realiza saída de stream em uma `duration`
(function template)
[ operator<<(std::chrono::sys_time)](<#/doc/chrono/system_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `sys_time`
(function template)
[ operator<<(std::chrono::utc_time)](<#/doc/chrono/utc_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `utc_time`
(function template)
[ operator<<(std::chrono::tai_time)](<#/doc/chrono/tai_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `tai_time`
(function template)
[ operator<<(std::chrono::gps_time)](<#/doc/chrono/gps_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `gps_time`
(function template)
[ operator<<(std::chrono::file_time)](<#/doc/chrono/file_clock/operator_ltlt>)(C++20) | realiza saída de stream em um `file_time`
(function template)
(modelo de função)
[ operator<<(std::chrono::file_time)](<#/doc/chrono/file_clock/operator_ltlt>)(C++20) | realiza a saída para stream de um `file_time`
(modelo de função)
[ operator<<](<#/doc/chrono/day/operator_ltlt>)(C++20) | envia um `day` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/month/operator_ltlt>)(C++20) | envia um `month` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year/operator_ltlt>)(C++20) | envia um `year` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/weekday/operator_ltlt>)(C++20) | envia um `weekday` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/weekday_indexed/operator_ltlt>)(C++20) | envia um `weekday_indexed` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/weekday_last/operator_ltlt>)(C++20) | envia um `weekday_last` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/month_day/operator_ltlt>)(C++20) | envia um `month_day` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/month_day_last/operator_ltlt>)(C++20) | envia um `month_day_last` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/month_weekday/operator_ltlt>)(C++20) | envia um `month_weekday` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/month_weekday_last/operator_ltlt>)(C++20) | envia um `month_weekday_last` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year_month/operator_ltlt>)(C++20) | envia um `year_month` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year_month_day/operator_ltlt>)(C++20) | envia um `year_month_day` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year_month_day_last/operator_ltlt>)(C++20) | envia um `year_month_day_last` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year_month_weekday/operator_ltlt>)(C++20) | envia um `year_month_weekday` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/year_month_weekday_last/operator_ltlt>)(C++20) | envia um `year_month_weekday_last` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/hh_mm_ss/operator_ltlt>)(C++20) | envia um `hh_mm_ss` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/sys_info/operator_ltlt>)(C++20) | envia um `sys_info` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/local_info/operator_ltlt>)(C++20) | envia um `local_info` para uma stream
(modelo de função)
[ operator<<](<#/doc/chrono/zoned_time/operator_ltlt>)(C++20) | envia um `zoned_time` para uma stream
(modelo de função)
[ from_stream](<#/doc/chrono/day/from_stream>)(C++20) | analisa um `day` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/month/from_stream>)(C++20) | analisa um `month` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year/from_stream>)(C++20) | analisa um `year` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/weekday/from_stream>)(C++20) | analisa um `weekday` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/month_day/from_stream>)(C++20) | analisa um `month_day` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year_month/from_stream>)(C++20) | analisa um `year_month` de uma stream de acordo com o formato fornecido
(modelo de função)
[ from_stream](<#/doc/chrono/year_month_day/from_stream>)(C++20) | analisa um `year_month_day` de uma stream de acordo com o formato fornecido
(modelo de função)
[ parse](<#/doc/chrono/parse>)(C++20) | analisa um objeto `chrono` de uma stream

##### Literais

Definido no namespace inline `std::literals::chrono_literals`
[ operator""h](<#/doc/chrono/operator_q__q_h>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando horas
(função)
[ operator""min](<#/doc/chrono/operator_q__q_min>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando minutos
(função)
[ operator""s](<#/doc/chrono/operator_q__q_s>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando segundos
(função)
[ operator""ms](<#/doc/chrono/operator_q__q_ms>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando milissegundos
(função)
[ operator""us](<#/doc/chrono/operator_q__q_us>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando microssegundos
(função)
[ operator""ns](<#/doc/chrono/operator_q__q_ns>)(C++14) | um literal [std::chrono::duration](<#/doc/chrono/duration>) representando nanossegundos
(função)
[ operator""d](<#/doc/chrono/operator_q__q_d>)(C++20) | um literal std::chrono::day representando um dia do mês
(função)
[ operator""y](<#/doc/chrono/operator_q__q_y>)(C++20) | um literal std::chrono::year representando um ano específico
(função)

### Sinopse
```cpp
    #include <compare>
    
    namespace std {
      namespace chrono {
        // modelo de classe duration
        template<class Rep, class Period = ratio<1>> class duration;
    
        // modelo de classe time_point
        template<class Clock, class Duration = typename Clock::duration> class time_point;
      }
    
      // especializações de common_type
      template<class Rep1, class Period1, class Rep2, class Period2>
        struct common_type<chrono::duration<Rep1, Period1>,
                           chrono::duration<Rep2, Period2>>;
    
      template<class Clock, class Duration1, class Duration2>
        struct common_type<chrono::time_point<Clock, Duration1>,
                           chrono::time_point<Clock, Duration2>>;
    
      namespace chrono {
        // traits de customização
        template<class Rep> struct treat_as_floating_point;
        template<class Rep>
          inline constexpr bool treat_as_floating_point_v = treat_as_floating_point<Rep>::value;
    
        template<class Rep> struct duration_values;
    
        template<class T> struct is_clock;
        template<class T> inline constexpr bool is_clock_v = is_clock<T>::value;
    
        // aritmética de duration
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr common_type_t<duration<Rep1, Period1>, duration<Rep2, Period2>>
            operator+(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr common_type_t<duration<Rep1, Period1>, duration<Rep2, Period2>>
            operator-(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period, class Rep2>
          constexpr duration<common_type_t<Rep1, Rep2>, Period>
            operator*(const duration<Rep1, Period>& d, const Rep2& s);
        template<class Rep1, class Rep2, class Period>
          constexpr duration<common_type_t<Rep1, Rep2>, Period>
            operator*(const Rep1& s, const duration<Rep2, Period>& d);
        template<class Rep1, class Period, class Rep2>
          constexpr duration<common_type_t<Rep1, Rep2>, Period>
            operator/(const duration<Rep1, Period>& d, const Rep2& s);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr common_type_t<Rep1, Rep2>
            operator/(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period, class Rep2>
          constexpr duration<common_type_t<Rep1, Rep2>, Period>
            operator%(const duration<Rep1, Period>& d, const Rep2& s);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr common_type_t<duration<Rep1, Period1>, duration<Rep2, Period2>>
            operator%(const duration<Rep1, Period1>& lhs, const duration<Rep2, Period2>& rhs);
    
        // comparações de duration
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr bool operator==(const duration<Rep1, Period1>& lhs,
                                    const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr bool operator< (const duration<Rep1, Period1>& lhs,
                                    const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr bool operator> (const duration<Rep1, Period1>& lhs,
                                    const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr bool operator<=(const duration<Rep1, Period1>& lhs,
                                    const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          constexpr bool operator>=(const duration<Rep1, Period1>& lhs,
                                    const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Rep2, class Period2>
          requires /* veja a descrição */
          constexpr auto operator<=>(const duration<Rep1, Period1>& lhs,
                                     const duration<Rep2, Period2>& rhs);
    
        // conversões
        template<class ToDuration, class Rep, class Period>
          constexpr ToDuration duration_cast(const duration<Rep, Period>& d);
        template<class ToDuration, class Rep, class Period>
          constexpr ToDuration floor(const duration<Rep, Period>& d);
        template<class ToDuration, class Rep, class Period>
          constexpr ToDuration ceil(const duration<Rep, Period>& d);
        template<class ToDuration, class Rep, class Period>
          constexpr ToDuration round(const duration<Rep, Period>& d);
    
        // E/S de duration
        template<class CharT, class Traits, class Rep, class Period>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os,
                       const duration<Rep, Period>& d);
        template<class CharT, class Traits, class Rep, class Period, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        duration<Rep, Period>& d,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // typedefs de conveniência
        using nanoseconds  = duration</* tipo inteiro com sinal de pelo menos 64 bits */, nano>;
        using microseconds = duration</* tipo inteiro com sinal de pelo menos 55 bits */, micro>;
        using milliseconds = duration</* tipo inteiro com sinal de pelo menos 45 bits */, milli>;
        using seconds      = duration</* tipo inteiro com sinal de pelo menos 35 bits */>;
        using minutes      = duration</* tipo inteiro com sinal de pelo menos 29 bits */,
                                      ratio<  60>>;
        using hours        = duration</* tipo inteiro com sinal de pelo menos 23 bits */,
                                      ratio<3600>>;
        using days         = duration</* tipo inteiro com sinal de pelo menos 25 bits */,
                                      ratio_multiply<ratio<24>, hours::period>>;
        using weeks        = duration</* tipo inteiro com sinal de pelo menos 22 bits */,
                                      ratio_multiply<ratio<7>, days::period>>;
        using years        = duration</* tipo inteiro com sinal de pelo menos 17 bits */,
                                      ratio_multiply<ratio<146097, 400>, days::period>>;
        using months       = duration</* tipo inteiro com sinal de pelo menos 20 bits */,
                                      ratio_divide<years::period, ratio<12>>>;
    
        // aritmética de time_point
        template<class Clock, class Duration1, class Rep2, class Period2>
          constexpr time_point<Clock, common_type_t<Duration1, duration<Rep2, Period2>>>
            operator+(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs);
        template<class Rep1, class Period1, class Clock, class Duration2>
          constexpr time_point<Clock, common_type_t<duration<Rep1, Period1>, Duration2>>
            operator+(const duration<Rep1, Period1>& lhs, const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, class Rep2, class Period2>
          constexpr time_point<Clock, common_type_t<Duration1, duration<Rep2, Period2>>>
            operator-(const time_point<Clock, Duration1>& lhs, const duration<Rep2, Period2>& rhs);
        template<class Clock, class Duration1, class Duration2>
          constexpr common_type_t<Duration1, Duration2>
            operator-(const time_point<Clock, Duration1>& lhs,
                      const time_point<Clock, Duration2>& rhs);
    
        // comparações de time_point
        template<class Clock, class Duration1, class Duration2>
           constexpr bool operator==(const time_point<Clock, Duration1>& lhs,
                                     const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, class Duration2>
           constexpr bool operator< (const time_point<Clock, Duration1>& lhs,
                                     const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, class Duration2>
           constexpr bool operator> (const time_point<Clock, Duration1>& lhs,
                                     const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, class Duration2>
           constexpr bool operator<=(const time_point<Clock, Duration1>& lhs,
                                     const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, class Duration2>
           constexpr bool operator>=(const time_point<Clock, Duration1>& lhs,
                                     const time_point<Clock, Duration2>& rhs);
        template<class Clock, class Duration1, three_way_comparable_with<Duration1> Duration2>
           constexpr auto operator<=>(const time_point<Clock, Duration1>& lhs,
                                      const time_point<Clock, Duration2>& rhs);
    
        // conversões
        template<class ToDuration, class Clock, class Duration>
          constexpr time_point<Clock, ToDuration>
            time_point_cast(const time_point<Clock, Duration>& t);
        template<class ToDuration, class Clock, class Duration>
          constexpr time_point<Clock, ToDuration> floor(const time_point<Clock, Duration>& tp);
        template<class ToDuration, class Clock, class Duration>
          constexpr time_point<Clock, ToDuration> ceil(const time_point<Clock, Duration>& tp);
        template<class ToDuration, class Clock, class Duration>
          constexpr time_point<Clock, ToDuration> round(const time_point<Clock, Duration>& tp);
    
        // algoritmos especializados
        template<class Rep, class Period>
          constexpr duration<Rep, Period> abs(duration<Rep, Period> d);
    
        // classe system_clock
        class system_clock;
    
        template<class Duration>
          using sys_time  = time_point<system_clock, Duration>;
        using sys_seconds = sys_time<seconds>;
        using sys_days    = sys_time<days>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const sys_time<Duration>& tp);
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const sys_days& dp);
    
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        sys_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe utc_clock
        class utc_clock;
    
        template<class Duration>
          using utc_time  = time_point<utc_clock, Duration>;
        using utc_seconds = utc_time<seconds>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const utc_time<Duration>& t);
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        utc_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        struct leap_second_info;
    
        template<class Duration>
          leap_second_info get_leap_second_info(const utc_time<Duration>& ut);
    
        // classe tai_clock
        class tai_clock;
    
        template<class Duration>
          using tai_time  = time_point<tai_clock, Duration>;
        using tai_seconds = tai_time<seconds>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const tai_time<Duration>& t);
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        tai_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe gps_clock
        class gps_clock;
    
        template<class Duration>
          using gps_time  = time_point<gps_clock, Duration>;
        using gps_seconds = gps_time<seconds>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const gps_time<Duration>& t);
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        gps_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // tipo file_clock
        using file_clock = /* veja a descrição */;
    
        template<class Duration>
          using file_time = time_point<file_clock, Duration>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const file_time<Duration>& tp);
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        file_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe steady_clock
        class steady_clock;
    
        // classe high_resolution_clock
        class high_resolution_clock;
    
        // tempo local
        struct local_t {};
        template<class Duration>
          using local_time  = time_point<local_t, Duration>;
        using local_seconds = local_time<seconds>;
        using local_days    = local_time<days>;
    
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const local_time<Duration>& tp);
        template<class CharT, class Traits, class Duration, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        local_time<Duration>& tp,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // conversões de time_point
        template<class DestClock, class SourceClock>
          struct clock_time_conversion;
    
        template<class DestClock, class SourceClock, class Duration>
          auto clock_cast(const time_point<SourceClock, Duration>& t);
    
        // classe last_spec
        struct last_spec;
    
        // classe day
        class day;
    
        constexpr bool operator==(const day& x, const day& y) noexcept;
        constexpr strong_ordering operator<=>(const day& x, const day& y) noexcept;
    
        constexpr day  operator+(const day&  x, const days& y) noexcept;
        constexpr day  operator+(const days& x, const day&  y) noexcept;
        constexpr day  operator-(const day&  x, const days& y) noexcept;
        constexpr days operator-(const day&  x, const day&  y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const day& d);
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        day& d, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe month
        class month;
    
        constexpr bool operator==(const month& x, const month& y) noexcept;
        constexpr strong_ordering operator<=>(const month& x, const month& y) noexcept;
    
        constexpr month  operator+(const month&  x, const months& y) noexcept;
        constexpr month  operator+(const months& x,  const month& y) noexcept;
        constexpr month  operator-(const month&  x, const months& y) noexcept;
        constexpr months operator-(const month&  x,  const month& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const month& m);
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        month& m, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe year
        class year;
    
        constexpr bool operator==(const year& x, const year& y) noexcept;
        constexpr strong_ordering operator<=>(const year& x, const year& y) noexcept;
    
        constexpr year  operator+(const year&  x, const years& y) noexcept;
        constexpr year  operator+(const years& x, const year&  y) noexcept;
        constexpr year  operator-(const year&  x, const years& y) noexcept;
        constexpr years operator-(const year&  x, const year&  y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year& y);
    
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        year& y, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe weekday
        class weekday;
    
        constexpr bool operator==(const weekday& x, const weekday& y) noexcept;
    
        constexpr weekday operator+(const weekday& x, const days&    y) noexcept;
        constexpr weekday operator+(const days&    x, const weekday& y) noexcept;
        constexpr weekday operator-(const weekday& x, const days&    y) noexcept;
        constexpr days    operator-(const weekday& x, const weekday& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const weekday& wd);
    
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        weekday& wd, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe weekday_indexed
        class weekday_indexed;
    
        constexpr bool operator==(const weekday_indexed& x, const weekday_indexed& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const weekday_indexed& wdi);
    
        // classe weekday_last
        class weekday_last;
    
        constexpr bool operator==(const weekday_last& x, const weekday_last& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const weekday_last& wdl);
    
        // classe month_day
        class month_day;
    
        constexpr bool operator==(const month_day& x, const month_day& y) noexcept;
        constexpr strong_ordering operator<=>(const month_day& x, const month_day& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const month_day& md);
    
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        month_day& md, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe month_day_last
        class month_day_last;
    
        constexpr bool operator==(const month_day_last& x, const month_day_last& y) noexcept;
        constexpr strong_ordering operator<=>(const month_day_last& x,
                                              const month_day_last& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const month_day_last& mdl);
    
        // classe month_weekday
        class month_weekday;
    
        constexpr bool operator==(const month_weekday& x, const month_weekday& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const month_weekday& mwd);
    
        // classe month_weekday_last
        class month_weekday_last;
    
        constexpr bool operator==(const month_weekday_last& x, const month_weekday_last& y) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const month_weekday_last& mwdl);
    
        // classe year_month
        class year_month;
    
        constexpr bool operator==(const year_month& x, const year_month& y) noexcept;
        constexpr strong_ordering operator<=>(const year_month& x, const year_month& y) noexcept;
    
        constexpr year_month operator+(const year_month& ym, const months& dm) noexcept;
        constexpr year_month operator+(const months& dm, const year_month& ym) noexcept;
        constexpr year_month operator-(const year_month& ym, const months& dm) noexcept;
        constexpr months operator-(const year_month& x, const year_month& y) noexcept;
        constexpr year_month operator+(const year_month& ym, const years& dy) noexcept;
        constexpr year_month operator+(const years& dy, const year_month& ym) noexcept;
        constexpr year_month operator-(const year_month& ym, const years& dy) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year_month& ym);
    
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        year_month& ym, basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe year_month_day
        class year_month_day;
    
        constexpr bool operator==(const year_month_day& x, const year_month_day& y) noexcept;
        constexpr strong_ordering operator<=>(const year_month_day& x,
                                              const year_month_day& y) noexcept;
    
        constexpr year_month_day operator+(const year_month_day& ymd, const months& dm) noexcept;
        constexpr year_month_day operator+(const months& dm, const year_month_day& ymd) noexcept;
        constexpr year_month_day operator+(const year_month_day& ymd, const years& dy) noexcept;
        constexpr year_month_day operator+(const years& dy, const year_month_day& ymd) noexcept;
        constexpr year_month_day operator-(const year_month_day& ymd, const months& dm) noexcept;
        constexpr year_month_day operator-(const year_month_day& ymd, const years& dy) noexcept;
    
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year_month_day& ymd);
    
        template<class CharT, class Traits, class Alloc = allocator<CharT>>
          basic_istream<CharT, Traits>&
            from_stream(basic_istream<CharT, Traits>& is, const CharT* fmt,
                        year_month_day& ymd,
                        basic_string<CharT, Traits, Alloc>* abbrev = nullptr,
                        minutes* offset = nullptr);
    
        // classe year_month_day_last
        class year_month_day_last;
    
        constexpr bool operator==(const year_month_day_last& x,
                                  const year_month_day_last& y) noexcept;
        constexpr strong_ordering operator<=>(const year_month_day_last& x,
                                              const year_month_day_last& y) noexcept;
    
        constexpr year_month_day_last
          operator+(const year_month_day_last& ymdl, const months& dm) noexcept;
```
```cpp
        constexpr year_month_day_last
          operator+(const months& dm, const year_month_day_last& ymdl) noexcept;
        constexpr year_month_day_last
          operator+(const year_month_day_last& ymdl, const years& dy) noexcept;
        constexpr year_month_day_last
          operator+(const years& dy, const year_month_day_last& ymdl) noexcept;
        constexpr year_month_day_last
          operator-(const year_month_day_last& ymdl, const months& dm) noexcept;
        constexpr year_month_day_last
          operator-(const year_month_day_last& ymdl, const years& dy) noexcept;
     
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year_month_day_last& ymdl);
     
        // class year_month_weekday
        class year_month_weekday;
     
        constexpr bool operator==(const year_month_weekday& x,
                                  const year_month_weekday& y) noexcept;
     
        constexpr year_month_weekday
          operator+(const year_month_weekday& ymwd, const months& dm) noexcept;
        constexpr year_month_weekday
          operator+(const months& dm, const year_month_weekday& ymwd) noexcept;
        constexpr year_month_weekday
          operator+(const year_month_weekday& ymwd, const years& dy) noexcept;
        constexpr year_month_weekday
          operator+(const years& dy, const year_month_weekday& ymwd) noexcept;
        constexpr year_month_weekday
          operator-(const year_month_weekday& ymwd, const months& dm) noexcept;
        constexpr year_month_weekday
          operator-(const year_month_weekday& ymwd, const years& dy) noexcept;
     
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year_month_weekday& ymwdi);
     
        // class year_month_weekday_last
        class year_month_weekday_last;
     
        constexpr bool operator==(const year_month_weekday_last& x,
                                  const year_month_weekday_last& y) noexcept;
     
        constexpr year_month_weekday_last
          operator+(const year_month_weekday_last& ymwdl, const months& dm) noexcept;
        constexpr year_month_weekday_last
          operator+(const months& dm, const year_month_weekday_last& ymwdl) noexcept;
        constexpr year_month_weekday_last
          operator+(const year_month_weekday_last& ymwdl, const years& dy) noexcept;
        constexpr year_month_weekday_last
          operator+(const years& dy, const year_month_weekday_last& ymwdl) noexcept;
        constexpr year_month_weekday_last
          operator-(const year_month_weekday_last& ymwdl, const months& dm) noexcept;
        constexpr year_month_weekday_last
          operator-(const year_month_weekday_last& ymwdl, const years& dy) noexcept;
     
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const year_month_weekday_last& ymwdl);
     
        // operadores de sintaxe convencional do calendário civil
        constexpr year_month
          operator/(const year& y, const month& m) noexcept;
        constexpr year_month
          operator/(const year& y, int m) noexcept;
        constexpr month_day
          operator/(const month& m, const day& d) noexcept;
        constexpr month_day
          operator/(const month& m, int d) noexcept;
        constexpr month_day
          operator/(int m, const day& d) noexcept;
        constexpr month_day
          operator/(const day& d, const month& m) noexcept;
        constexpr month_day
          operator/(const day& d, int m) noexcept;
        constexpr month_day_last
          operator/(const month& m, last_spec) noexcept;
        constexpr month_day_last
          operator/(int m, last_spec) noexcept;
        constexpr month_day_last
          operator/(last_spec, const month& m) noexcept;
        constexpr month_day_last
          operator/(last_spec, int m) noexcept;
        constexpr month_weekday
          operator/(const month& m, const weekday_indexed& wdi) noexcept;
        constexpr month_weekday
          operator/(int m, const weekday_indexed& wdi) noexcept;
        constexpr month_weekday
          operator/(const weekday_indexed& wdi, const month& m) noexcept;
        constexpr month_weekday
          operator/(const weekday_indexed& wdi, int m) noexcept;
        constexpr month_weekday_last
          operator/(const month& m, const weekday_last& wdl) noexcept;
        constexpr month_weekday_last
          operator/(int m, const weekday_last& wdl) noexcept;
        constexpr month_weekday_last
          operator/(const weekday_last& wdl, const month& m) noexcept;
        constexpr month_weekday_last
          operator/(const weekday_last& wdl, int m) noexcept;
        constexpr year_month_day
          operator/(const year_month& ym, const day& d) noexcept;
        constexpr year_month_day
          operator/(const year_month& ym, int d) noexcept;
        constexpr year_month_day
          operator/(const year& y, const month_day& md) noexcept;
        constexpr year_month_day
          operator/(int y, const month_day& md) noexcept;
        constexpr year_month_day
          operator/(const month_day& md, const year& y) noexcept;
        constexpr year_month_day
          operator/(const month_day& md, int y) noexcept;
        constexpr year_month_day_last
          operator/(const year_month& ym, last_spec) noexcept;
        constexpr year_month_day_last
          operator/(const year& y, const month_day_last& mdl) noexcept;
        constexpr year_month_day_last
          operator/(int y, const month_day_last& mdl) noexcept;
        constexpr year_month_day_last
          operator/(const month_day_last& mdl, const year& y) noexcept;
        constexpr year_month_day_last
          operator/(const month_day_last& mdl, int y) noexcept;
        constexpr year_month_weekday
          operator/(const year_month& ym, const weekday_indexed& wdi) noexcept;
        constexpr year_month_weekday
          operator/(const year& y, const month_weekday& mwd) noexcept;
        constexpr year_month_weekday
          operator/(int y, const month_weekday& mwd) noexcept;
        constexpr year_month_weekday
          operator/(const month_weekday& mwd, const year& y) noexcept;
        constexpr year_month_weekday
          operator/(const month_weekday& mwd, int y) noexcept;
        constexpr year_month_weekday_last
          operator/(const year_month& ym, const weekday_last& wdl) noexcept;
        constexpr year_month_weekday_last
          operator/(const year& y, const month_weekday_last& mwdl) noexcept;
        constexpr year_month_weekday_last
          operator/(int y, const month_weekday_last& mwdl) noexcept;
        constexpr year_month_weekday_last
          operator/(const month_weekday_last& mwdl, const year& y) noexcept;
        constexpr year_month_weekday_last
          operator/(const month_weekday_last& mwdl, int y) noexcept;
     
        // template de classe hh_mm_ss
        template<class Duration> class hh_mm_ss;
     
        template<class CharT, class Traits, class Duration>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const hh_mm_ss<Duration>& hms);
     
        // funções de 12/24 horas
        constexpr bool is_am(const hours& h) noexcept;
        constexpr bool is_pm(const hours& h) noexcept;
        constexpr hours make12(const hours& h) noexcept;
        constexpr hours make24(const hours& h, bool is_pm) noexcept;
     
        // banco de dados de fuso horário
        struct tzdb;
        class tzdb_list;
     
        // acesso ao banco de dados de fuso horário
        const tzdb& get_tzdb();
        tzdb_list& get_tzdb_list();
        const time_zone* locate_zone(string_view tz_name);
        const time_zone* current_zone();
     
        // suporte a banco de dados de fuso horário remoto
        const tzdb& reload_tzdb();
        string remote_version();
     
        // classes de exceção
        class nonexistent_local_time;
        class ambiguous_local_time;
     
        // classes de informação
        struct sys_info;
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const sys_info& si);
     
        struct local_info;
        template<class CharT, class Traits>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os, const local_info& li);
     
        // classe time_zone
        enum class choose {earliest, latest};
        class time_zone;
     
        bool operator==(const time_zone& x, const time_zone& y) noexcept;
        strong_ordering operator<=>(const time_zone& x, const time_zone& y) noexcept;
     
        // template de classe zoned_traits
        template<class T> struct zoned_traits;
     
        // template de classe zoned_time
        template<class Duration, class TimeZonePtr = const time_zone*> class zoned_time;
     
        using zoned_seconds = zoned_time<seconds>;
     
        template<class Duration1, class Duration2, class TimeZonePtr>
          bool operator==(const zoned_time<Duration1, TimeZonePtr>& x,
                          const zoned_time<Duration2, TimeZonePtr>& y);
     
        template<class CharT, class Traits, class Duration, class TimeZonePtr>
          basic_ostream<CharT, Traits>&
            operator<<(basic_ostream<CharT, Traits>& os,
                       const zoned_time<Duration, TimeZonePtr>& t);
     
        // suporte a segundo bissexto
        class leap_second;
     
        bool operator==(const leap_second& x, const leap_second& y);
        strong_ordering operator<=>(const leap_second& x, const leap_second& y);
     
        template<class Duration>
          constexpr bool operator==(const leap_second& x, const sys_time<Duration>& y);
        template<class Duration>
          constexpr bool operator< (const leap_second& x, const sys_time<Duration>& y);
        template<class Duration>
          constexpr bool operator< (const sys_time<Duration>& x, const leap_second& y);
        template<class Duration>
          constexpr bool operator> (const leap_second& x, const sys_time<Duration>& y);
        template<class Duration>
          constexpr bool operator> (const sys_time<Duration>& x, const leap_second& y);
        template<class Duration>
          constexpr bool operator<=(const leap_second& x, const sys_time<Duration>& y);
        template<class Duration>
          constexpr bool operator<=(const sys_time<Duration>& x, const leap_second& y);
        template<class Duration>
          constexpr bool operator>=(const leap_second& x, const sys_time<Duration>& y);
        template<class Duration>
          constexpr bool operator>=(const sys_time<Duration>& x, const leap_second& y);
        template<class Duration>
          requires three_way_comparable_with<sys_seconds, sys_time<Duration>>
          constexpr auto operator<=>(const leap_second& x, const sys_time<Duration>& y);
     
        // classe time_zone_link
        class time_zone_link;
     
        bool operator==(const time_zone_link& x, const time_zone_link& y);
        strong_ordering operator<=>(const time_zone_link& x, const time_zone_link& y);
     
        // formatação
        template<class Duration> struct /*local-time-format-t*/;    // apenas para exposição
        template<class Duration>
          /*local-time-format-t*/<Duration>
            local_time_format(local_time<Duration> time, const string* abbrev = nullptr,
                              const seconds* offset_sec = nullptr);
      }
     
      template<class Rep, class Period, class CharT>
        struct formatter<chrono::duration<Rep, Period>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::sys_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::utc_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::tai_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::gps_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::file_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::local_time<Duration>, CharT>;
      template<class Duration, class CharT>
        struct formatter<chrono::/*local-time-format-t*/<Duration>, CharT>;
      template<class CharT> struct formatter<chrono::day, CharT>;
      template<class CharT> struct formatter<chrono::month, CharT>;
      template<class CharT> struct formatter<chrono::year, CharT>;
      template<class CharT> struct formatter<chrono::weekday, CharT>;
      template<class CharT> struct formatter<chrono::weekday_indexed, CharT>;
      template<class CharT> struct formatter<chrono::weekday_last, CharT>;
      template<class CharT> struct formatter<chrono::month_day, CharT>;
      template<class CharT> struct formatter<chrono::month_day_last, CharT>;
      template<class CharT> struct formatter<chrono::month_weekday, CharT>;
      template<class CharT> struct formatter<chrono::month_weekday_last, CharT>;
      template<class CharT> struct formatter<chrono::year_month, CharT>;
      template<class CharT> struct formatter<chrono::year_month_day, CharT>;
      template<class CharT> struct formatter<chrono::year_month_day_last, CharT>;
      template<class CharT> struct formatter<chrono::year_month_weekday, CharT>;
      template<class CharT> struct formatter<chrono::year_month_weekday_last, CharT>;
      template<class Rep, class Period, class CharT>
        struct formatter<chrono::hh_mm_ss<duration<Rep, Period>>, CharT>;
      template<class CharT> struct formatter<chrono::sys_info, CharT>;
      template<class CharT> struct formatter<chrono::local_info, CharT>;
      template<class Duration, class TimeZonePtr, class CharT>
        struct formatter<chrono::zoned_time<Duration, TimeZonePtr>, CharT>;
     
      namespace chrono {
        // análise (parsing)
        template<class CharT, class Parsable>
          /* unspecified */
            parse(const CharT* fmt, Parsable& tp);
     
        template<class CharT, class Traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const basic_string<CharT, Traits, Alloc>& format, Parsable& tp);
     
        template<class CharT, class traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const CharT* fmt, Parsable& tp,
                  basic_string<CharT, traits, Alloc>& abbrev);
     
        template<class CharT, class Traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const basic_string<CharT, Traits, Alloc>& format, Parsable& tp,
                  basic_string<CharT, Traits, Alloc>& abbrev);
     
        template<class CharT, class Parsable>
          /* unspecified */
            parse(const CharT* fmt, Parsable& tp, minutes& offset);
     
        template<class CharT, class Traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const basic_string<CharT, Traits, Alloc>& format, Parsable& tp,
                  minutes& offset);
     
        template<class CharT, class traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const CharT* fmt, Parsable& tp,
                  basic_string<CharT, traits, Alloc>& abbrev, minutes& offset);
     
        template<class CharT, class Traits, class Alloc, class Parsable>
          /* unspecified */
            parse(const basic_string<CharT, Traits, Alloc>& format, Parsable& tp,
                  basic_string<CharT, Traits, Alloc>& abbrev, minutes& offset);
     
        // constantes calendáricas
        inline constexpr last_spec last{};
     
        inline constexpr weekday Sunday{0};
        inline constexpr weekday Monday{1};
        inline constexpr weekday Tuesday{2};
        inline constexpr weekday Wednesday{3};
        inline constexpr weekday Thursday{4};
        inline constexpr weekday Friday{5};
        inline constexpr weekday Saturday{6};
     
        inline constexpr month January{1};
        inline constexpr month February{2};
        inline constexpr month March{3};
        inline constexpr month April{4};
        inline constexpr month May{5};
        inline constexpr month June{6};
        inline constexpr month July{7};
        inline constexpr month August{8};
        inline constexpr month September{9};
        inline constexpr month October{10};
        inline constexpr month November{11};
        inline constexpr month December{12};
      }
     
      inline namespace literals {
      inline namespace chrono_literals {
        // sufixos para literais de duration
        constexpr chrono::hours                    operator""h(unsigned long long);
        constexpr chrono::duration</* unspecified */,
                                   ratio<3600, 1>> operator""h(long double);
     
        constexpr chrono::minutes                operator""min(unsigned long long);
        constexpr chrono::duration</* unspecified */,
                                   ratio<60, 1>> operator""min(long double);
     
        constexpr chrono::seconds                     operator""s(unsigned long long);
        constexpr chrono::duration</* unspecified */> operator""s(long double);
     
        constexpr chrono::milliseconds                       operator""ms(unsigned long long);
        constexpr chrono::duration</* unspecified */, milli> operator""ms(long double);
     
        constexpr chrono::microseconds                       operator""us(unsigned long long);
        constexpr chrono::duration</* unspecified */, micro> operator""us(long double);
     
        constexpr chrono::nanoseconds                       operator""ns(unsigned long long);
        constexpr chrono::duration</* unspecified */, nano> operator""ns(long double);
     
        // funções não-membro
        constexpr chrono::day  operator""d(unsigned long long d) noexcept;
     
        // funções não-membro
        constexpr chrono::year operator""y(unsigned long long y) noexcept;
      }
      }
     
      namespace chrono {
        using namespace literals::chrono_literals;
      }
     
      // suporte a hash
      template<class T> struct hash;
      template<class Rep, class Period>
        struct hash<chrono::duration<Rep, Period>>;
      template<class Clock, class Duration>
        struct hash<chrono::time_point<Clock, Duration>>;
      template<> struct hash<chrono::day>;
      template<> struct hash<chrono::month>;
      template<> struct hash<chrono::year>;
      template<> struct hash<chrono::weekday>;
      template<> struct hash<chrono::weekday_indexed>;
      template<> struct hash<chrono::weekday_last>;
      template<> struct hash<chrono::month_day>;
      template<> struct hash<chrono::month_day_last>;
      template<> struct hash<chrono::month_weekday>;
      template<> struct hash<chrono::month_weekday_last>;
      template<> struct hash<chrono::year_month>;
      template<> struct hash<chrono::year_month_day>;
      template<> struct hash<chrono::year_month_day_last>;
      template<> struct hash<chrono::year_month_weekday>;
      template<> struct hash<chrono::year_month_weekday_last>;
      template<class Duration, class TimeZonePtr>
        struct hash<chrono::zoned_time<Duration, TimeZonePtr>>;
      template<> struct hash<chrono::leap_second>;
    }
```

#### Template de classe [std::chrono::duration](<#/doc/chrono/duration>)
```cpp
    namespace std::chrono {
      template<class Rep, class Period = ratio<1>>
      class duration {
      public:
        using rep    = Rep;
        using period = typename Period::type;
     
      private:
        rep rep_;       // apenas para exposição
     
      public:
        // construir/copiar/destruir
        constexpr duration() = default;
        template<class Rep2>
          constexpr explicit duration(const Rep2& r);
        template<class Rep2, class Period2>
          constexpr duration(const duration<Rep2, Period2>& d);
        ~duration() = default;
        duration(const duration&) = default;
        duration& operator=(const duration&) = default;
     
        // observador
        constexpr rep count() const;
     
        // aritmética
        constexpr common_type_t<duration> operator+() const;
        constexpr common_type_t<duration> operator-() const;
        constexpr duration& operator++();
        constexpr duration  operator++(int);
        constexpr duration& operator--();
        constexpr duration  operator--(int);
     
        constexpr duration& operator+=(const duration& d);
        constexpr duration& operator-=(const duration& d);
     
        constexpr duration& operator*=(const rep& rhs);
        constexpr duration& operator/=(const rep& rhs);
        constexpr duration& operator%=(const rep& rhs);
        constexpr duration& operator%=(const duration& rhs);
     
        // valores especiais
        static constexpr duration zero() noexcept;
        static constexpr duration min() noexcept;
        static constexpr duration max() noexcept;
      };
    }
```

#### Template de classe [std::chrono::time_point](<#/doc/chrono/time_point>)
```cpp
    namespace std::chrono {
      template<class Clock, class Duration = typename Clock::duration>
      class time_point {
      public:
        using clock    = Clock;
        using duration = Duration;
        using rep      = typename duration::rep;
        using period   = typename duration::period;
     
      private:
        duration d_;                                                // apenas para exposição
     
      public:
        // construir
        constexpr time_point();                                     // tem valor epoch
        constexpr explicit time_point(const duration& d);           // o mesmo que time_point() + d
        template<class Duration2>
          constexpr time_point(const time_point<clock, Duration2>& t);
     
        // observador
        constexpr duration time_since_epoch() const;
     
        // aritmética
        constexpr time_point& operator++();
        constexpr time_point operator++(int);
        constexpr time_point& operator--();
        constexpr time_point operator--(int);
        constexpr time_point& operator+=(const duration& d);
        constexpr time_point& operator-=(const duration& d);
     
        // valores especiais
        static constexpr time_point min() noexcept;
        static constexpr time_point max() noexcept;
      };
    }
```

#### Especialização do template de classe [std::common_type](<#/doc/types/common_type>) para [std::chrono::duration](<#/doc/chrono/duration>)
```cpp
    namespace std {
      template<class Rep1, class Period1, class Rep2, class Period2>
        struct common_type<chrono::duration<Rep1, Period1>,
                           chrono::duration<Rep2, Period2>> {
          using type = chrono::duration<common_type_t<Rep1, Rep2>, /* ver descrição */>;
        };
    }
```

#### Especialização do template de classe [std::common_type](<#/doc/types/common_type>) para [std::chrono::time_point](<#/doc/chrono/time_point>)
```cpp
    namespace std {
      template<class Clock, class Duration1, class Duration2>
        struct common_type<chrono::time_point<Clock, Duration1>,
                           chrono::time_point<Clock, Duration2>> {
          using type = chrono::time_point<Clock, common_type_t<Duration1, Duration2>>;
        };
    }
```

#### Template de classe [std::chrono::treat_as_floating_point](<#/doc/chrono/treat_as_floating_point>)
```cpp
    template<class Rep> struct treat_as_floating_point : is_floating_point<Rep> { };
```

#### Template de classe [std::chrono::duration_values](<#/doc/chrono/duration_values>)
```cpp
    namespace std::chrono {
      template<class Rep>
        struct duration_values {
        public:
          static constexpr Rep zero() noexcept;
          static constexpr Rep min() noexcept;
          static constexpr Rep max() noexcept;
        };
    }
```

#### Classe [std::chrono::system_clock](<#/doc/chrono/system_clock>)
```cpp
    namespace std::chrono {
      class system_clock {
      public:
        using rep        = /* ver descrição */;
        using period     = ratio</* não especificado */, /* não especificado */>;
        using duration   = chrono::duration<rep, period>;
        using time_point = chrono::time_point<system_clock>;
        static constexpr bool is_steady = /* não especificado */;
     
        static time_point now() noexcept;
     
        // mapeamento para/de o tipo C time_t
        static time_t      to_time_t  (const time_point& t) noexcept;
        static time_point  from_time_t(time_t t) noexcept;
      };
    }
```

#### Classe [std::chrono::utc_clock](<#/doc/chrono/utc_clock>)
```cpp
    namespace std::chrono {
      class utc_clock {
      public:
        using rep                       = /* um tipo aritmético com sinal */;
        using period                    = ratio</* não especificado */, /* não especificado */>;
        using duration                  = chrono::duration<rep, period>;
        using time_point                = chrono::time_point<utc_clock>;
        static constexpr bool is_steady = /* não especificado */;
     
        static time_point now();
     
        template<class Duration>
          static sys_time<common_type_t<Duration, seconds>>
            to_sys(const utc_time<Duration>& t);
        template<class Duration>
          static utc_time<common_type_t<Duration, seconds>>
            from_sys(const sys_time<Duration>& t);
      };
    }
```

#### Classe [std::chrono::tai_clock](<#/doc/chrono/tai_clock>)
```cpp
    namespace std::chrono {
      class tai_clock {
      public:
        using rep                       = /* um tipo aritmético com sinal */;
        using period                    = ratio</* não especificado */, /* não especificado */>;
        using duration                  = chrono::duration<rep, period>;
        using time_point                = chrono::time_point<tai_clock>;
        static constexpr bool is_steady = /* não especificado */;
     
        static time_point now();
     
        template<class Duration>
          static sys_time<common_type_t<Duration, seconds>>
            to_sys(const tai_time<Duration>& t);
        template<class Duration>
          static tai_time<common_type_t<Duration, seconds>>
            from_sys(const sys_time<Duration>& t);
      };
    }
```

#### Classe [std::chrono::gps_clock](<#/doc/chrono/gps_clock>)
```cpp
    namespace std::chrono {
      class gps_clock {
      public:
        using rep                       = /* um tipo aritmético com sinal */;
        using period                    = ratio</* não especificado */, /* não especificado */>;
        using duration                  = chrono::duration<rep, period>;
        using time_point                = chrono::time_point<gps_clock>;
        static constexpr bool is_steady = /* não especificado */;
     
        static time_point now();
     
        template<class Duration>
          static sys_time<common_type_t<Duration, seconds>>
            to_sys(const gps_time<Duration>& t);
        template<class Duration>
          static gps_time<common_type_t<Duration, seconds>>
            from_sys(const sys_time<Duration>& t);
      };
    }
```

#### Classe [std::chrono::steady_clock](<#/doc/chrono/steady_clock>)
```cpp
    namespace std::chrono {
      class steady_clock {
      public:
        using rep        = /* não especificado */;
        using period     = ratio</* não especificado */, /* não especificado */>;
        using duration   = chrono::duration<rep, period>;
        using time_point = chrono::time_point</* não especificado */, duration>;
        static constexpr bool is_steady = true;
     
        static time_point now() noexcept;
      };
    }
```

#### Classe [std::chrono::high_resolution_clock](<#/doc/chrono/high_resolution_clock>)
```cpp
    namespace std::chrono {
      class high_resolution_clock {
      public:
        using rep        = /* não especificado */;
        using period     = ratio</* não especificado */, /* não especificado */>;
        using duration   = chrono::duration<rep, period>;
        using time_point = chrono::time_point</* não especificado */, duration>;
        static constexpr bool is_steady = /* não especificado */;
     
        static time_point now() noexcept;
      };
    }
```

#### Template de classe [std::chrono::clock_time_conversion](<#/doc/chrono/clock_time_conversion>)
```cpp
    namespace std::chrono {
      template<class DestClock, class SourceClock>
      struct clock_time_conversion {};
     
      template<class Clock>
      struct clock_time_conversion<Clock, Clock> {
        template<class Duration>
          time_point<Clock, Duration>
            operator()(const time_point<Clock, Duration>& t) const;
      };
     
      template<>
      struct clock_time_conversion<system_clock, system_clock> {
        template<class Duration>
          sys_time<Duration>
            operator()(const sys_time<Duration>& t) const;
      };
     
      template<>
      struct clock_time_conversion<utc_clock, utc_clock> {
        template<class Duration>
          utc_time<Duration>
            operator()(const utc_time<Duration>& t) const;
      };
     
      template<>
      struct clock_time_conversion<utc_clock, system_clock> {
        template<class Duration>
          utc_time<common_type_t<Duration, seconds>>
            operator()(const sys_time<Duration>& t) const;
      };
     
      template<>
      struct clock_time_conversion<system_clock, utc_clock> {
        template<class Duration>
          sys_time<common_type_t<Duration, seconds>>
            operator()(const utc_time<Duration>& t) const;
      };
     
      template<class SourceClock>
      struct clock_time_conversion<system_clock, SourceClock> {
        template<class Duration>
          auto operator()(const time_point<SourceClock, Duration>& t) const
            -> decltype(SourceClock::to_sys(t));
      };
     
      template<class DestClock>
      struct clock_time_conversion<DestClock, system_clock> {
        template<class Duration>
          auto operator()(const sys_time<Duration>& t) const
            -> decltype(DestClock::from_sys(t));
      };
     
      template<class SourceClock>
      struct clock_time_conversion<utc_clock, SourceClock> {
        template<class Duration>
          auto operator()(const time_point<SourceClock, Duration>& t) const
            -> decltype(SourceClock::to_utc(t));
      };
     
      template<class DestClock>
      struct clock_time_conversion<DestClock, utc_clock> {
        template<class Duration>
          auto operator()(const utc_time<Duration>& t) const
            -> decltype(DestClock::from_utc(t));
      };
    }
```

#### Classe [std::chrono::last_spec](<#/doc/chrono/last_spec>)
```cpp
    namespace std::chrono {
      struct last_spec {
        explicit last_spec() = default;
      };
    }
```

#### Classe [std::chrono::day](<#/doc/chrono/day>)
```cpp
    namespace std::chrono {
      class day {
        unsigned char d_;           // apenas para exposição
      public:
        day() = default;
        constexpr explicit day(unsigned d) noexcept;
     
        constexpr day& operator++()    noexcept;
        constexpr day  operator++(int) noexcept;
        constexpr day& operator--()    noexcept;
        constexpr day  operator--(int) noexcept;
     
        constexpr day& operator+=(const days& d) noexcept;
        constexpr day& operator-=(const days& d) noexcept;
     
        constexpr explicit operator unsigned() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Classe [std::chrono::month](<#/doc/chrono/month>)
```cpp
    namespace std::chrono {
      class month {
        unsigned char m_;           // apenas para exposição
      public:
```
```cpp
        month() = default;
        constexpr explicit month(unsigned m) noexcept;
     
        constexpr month& operator++()    noexcept;
        constexpr month  operator++(int) noexcept;
        constexpr month& operator--()    noexcept;
        constexpr month  operator--(int) noexcept;
     
        constexpr month& operator+=(const months& m) noexcept;
        constexpr month& operator-=(const months& m) noexcept;
     
        constexpr explicit operator unsigned() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year](<#/doc/chrono/year>)
```cpp
    namespace std::chrono {
      class year {
        short y_;                   // apenas para exposição
      public:
        year() = default;
        constexpr explicit year(int y) noexcept;
     
        constexpr year& operator++()    noexcept;
        constexpr year  operator++(int) noexcept;
        constexpr year& operator--()    noexcept;
        constexpr year  operator--(int) noexcept;
     
        constexpr year& operator+=(const years& y) noexcept;
        constexpr year& operator-=(const years& y) noexcept;
     
        constexpr year operator+() const noexcept;
        constexpr year operator-() const noexcept;
     
        constexpr bool is_leap() const noexcept;
     
        constexpr explicit operator int() const noexcept;
        constexpr bool ok() const noexcept;
     
        static constexpr year min() noexcept;
        static constexpr year max() noexcept;
      };
    }
```

#### Class [std::chrono::weekday](<#/doc/chrono/weekday>)
```cpp
    namespace std::chrono {
      class weekday {
        unsigned char wd_;          // apenas para exposição
      public:
        weekday() = default;
        constexpr explicit weekday(unsigned wd) noexcept;
        constexpr weekday(const sys_days& dp) noexcept;
        constexpr explicit weekday(const local_days& dp) noexcept;
     
        constexpr weekday& operator++()    noexcept;
        constexpr weekday  operator++(int) noexcept;
        constexpr weekday& operator--()    noexcept;
        constexpr weekday  operator--(int) noexcept;
     
        constexpr weekday& operator+=(const days& d) noexcept;
        constexpr weekday& operator-=(const days& d) noexcept;
     
        constexpr unsigned c_encoding() const noexcept;
        constexpr unsigned iso_encoding() const noexcept;
        constexpr bool ok() const noexcept;
     
        constexpr weekday_indexed operator const noexcept;
        constexpr weekday_last    operator const noexcept;
      };
    }
```

#### Class [std::chrono::weekday_indexed](<#/doc/chrono/weekday_indexed>)
```cpp
    namespace std::chrono {
      class weekday_indexed {
        chrono::weekday  wd_;       // apenas para exposição
        unsigned char    index_;    // apenas para exposição
     
      public:
        weekday_indexed() = default;
        constexpr weekday_indexed(const chrono::weekday& wd, unsigned index) noexcept;
     
        constexpr chrono::weekday weekday() const noexcept;
        constexpr unsigned        index()   const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::weekday_last](<#/doc/chrono/weekday_last>)
```cpp
    namespace std::chrono {
      class weekday_last {
        chrono::weekday wd_;                // apenas para exposição
     
        public:
        constexpr explicit weekday_last(const chrono::weekday& wd) noexcept;
     
        constexpr chrono::weekday weekday() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::month_day](<#/doc/chrono/month_day>)
```cpp
    namespace std::chrono {
      class month_day {
        chrono::month m_;           // apenas para exposição
        chrono::day   d_;           // apenas para exposição
     
      public:
        month_day() = default;
        constexpr month_day(const chrono::month& m, const chrono::day& d) noexcept;
     
        constexpr chrono::month month() const noexcept;
        constexpr chrono::day   day()   const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::month_day_last](<#/doc/chrono/month_day_last>)
```cpp
    namespace std::chrono {
      class month_day_last {
        chrono::month m_;                   // apenas para exposição
     
      public:
        constexpr explicit month_day_last(const chrono::month& m) noexcept;
     
        constexpr chrono::month month() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::month_weekday](<#/doc/chrono/month_weekday>)
```cpp
    namespace std::chrono {
      class month_weekday {
        chrono::month           m_;         // apenas para exposição
        chrono::weekday_indexed wdi_;       // apenas para exposição
      public:
        constexpr month_weekday(const chrono::month& m,
                                const chrono::weekday_indexed& wdi) noexcept;
     
        constexpr chrono::month           month()           const noexcept;
        constexpr chrono::weekday_indexed weekday_indexed() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::month_weekday_last](<#/doc/chrono/month_weekday_last>)
```cpp
    namespace std::chrono {
      class month_weekday_last {
        chrono::month        m_;    // apenas para exposição
        chrono::weekday_last wdl_;  // apenas para exposição
      public:
        constexpr month_weekday_last(const chrono::month& m,
                                     const chrono::weekday_last& wdl) noexcept;
     
        constexpr chrono::month        month()        const noexcept;
        constexpr chrono::weekday_last weekday_last() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year_month](<#/doc/chrono/year_month>)
```cpp
    namespace std::chrono {
      class year_month {
        chrono::year  y_;           // apenas para exposição
        chrono::month m_;           // apenas para exposição
     
      public:
        year_month() = default;
        constexpr year_month(const chrono::year& y, const chrono::month& m) noexcept;
     
        constexpr chrono::year  year()  const noexcept;
        constexpr chrono::month month() const noexcept;
     
        constexpr year_month& operator+=(const months& dm) noexcept;
        constexpr year_month& operator-=(const months& dm) noexcept;
        constexpr year_month& operator+=(const years& dy)  noexcept;
        constexpr year_month& operator-=(const years& dy)  noexcept;
     
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year_month_day](<#/doc/chrono/year_month_day>)
```cpp
    namespace std::chrono {
      class year_month_day {
        chrono::year  y_;           // apenas para exposição
        chrono::month m_;           // apenas para exposição
        chrono::day   d_;           // apenas para exposição
     
      public:
        year_month_day() = default;
        constexpr year_month_day(const chrono::year& y, const chrono::month& m,
                                 const chrono::day& d) noexcept;
        constexpr year_month_day(const year_month_day_last& ymdl) noexcept;
        constexpr year_month_day(const sys_days& dp) noexcept;
        constexpr explicit year_month_day(const local_days& dp) noexcept;
     
        constexpr year_month_day& operator+=(const months& m) noexcept;
        constexpr year_month_day& operator-=(const months& m) noexcept;
        constexpr year_month_day& operator+=(const years& y)  noexcept;
        constexpr year_month_day& operator-=(const years& y)  noexcept;
     
        constexpr chrono::year  year()  const noexcept;
        constexpr chrono::month month() const noexcept;
        constexpr chrono::day   day()   const noexcept;
     
        constexpr          operator sys_days()   const noexcept;
        constexpr explicit operator local_days() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year_month_day_last](<#/doc/chrono/year_month_day_last>)
```cpp
    namespace std::chrono {
      class year_month_day_last {
        chrono::year           y_;          // apenas para exposição
        chrono::month_day_last mdl_;        // apenas para exposição
     
      public:
        constexpr year_month_day_last(const chrono::year& y,
                                      const chrono::month_day_last& mdl) noexcept;
     
        constexpr year_month_day_last& operator+=(const months& m) noexcept;
        constexpr year_month_day_last& operator-=(const months& m) noexcept;
        constexpr year_month_day_last& operator+=(const years& y)  noexcept;
        constexpr year_month_day_last& operator-=(const years& y)  noexcept;
     
        constexpr chrono::year           year()           const noexcept;
        constexpr chrono::month          month()          const noexcept;
        constexpr chrono::month_day_last month_day_last() const noexcept;
        constexpr chrono::day            day()            const noexcept;
     
        constexpr          operator sys_days()   const noexcept;
        constexpr explicit operator local_days() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year_month_weekday](<#/doc/chrono/year_month_weekday>)
```cpp
    namespace std::chrono {
      class year_month_weekday {
        chrono::year            y_;         // apenas para exposição
        chrono::month           m_;         // apenas para exposição
        chrono::weekday_indexed wdi_;       // apenas para exposição
     
      public:
        year_month_weekday() = default;
        constexpr year_month_weekday(const chrono::year& y, const chrono::month& m,
                                     const chrono::weekday_indexed& wdi) noexcept;
        constexpr year_month_weekday(const sys_days& dp) noexcept;
        constexpr explicit year_month_weekday(const local_days& dp) noexcept;
     
        constexpr year_month_weekday& operator+=(const months& m) noexcept;
        constexpr year_month_weekday& operator-=(const months& m) noexcept;
        constexpr year_month_weekday& operator+=(const years& y)  noexcept;
        constexpr year_month_weekday& operator-=(const years& y)  noexcept;
     
        constexpr chrono::year            year()            const noexcept;
        constexpr chrono::month           month()           const noexcept;
        constexpr chrono::weekday         weekday()         const noexcept;
        constexpr unsigned                index()           const noexcept;
        constexpr chrono::weekday_indexed weekday_indexed() const noexcept;
     
        constexpr          operator sys_days()   const noexcept;
        constexpr explicit operator local_days() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class [std::chrono::year_month_weekday_last](<#/doc/chrono/year_month_weekday_last>)
```cpp
    namespace std::chrono {
      class year_month_weekday_last {
        chrono::year         y_;    // apenas para exposição
        chrono::month        m_;    // apenas para exposição
        chrono::weekday_last wdl_;  // apenas para exposição
     
      public:
        constexpr year_month_weekday_last(const chrono::year& y, const chrono::month& m,
                                          const chrono::weekday_last& wdl) noexcept;
     
        constexpr year_month_weekday_last& operator+=(const months& m) noexcept;
        constexpr year_month_weekday_last& operator-=(const months& m) noexcept;
        constexpr year_month_weekday_last& operator+=(const years& y)  noexcept;
        constexpr year_month_weekday_last& operator-=(const years& y)  noexcept;
     
        constexpr chrono::year         year()         const noexcept;
        constexpr chrono::month        month()        const noexcept;
        constexpr chrono::weekday      weekday()      const noexcept;
        constexpr chrono::weekday_last weekday_last() const noexcept;
     
        constexpr          operator sys_days()   const noexcept;
        constexpr explicit operator local_days() const noexcept;
        constexpr bool ok() const noexcept;
      };
    }
```

#### Class template [std::chrono::hh_mm_ss](<#/doc/chrono/hh_mm_ss>)
```cpp
    namespace std::chrono {
      template<class Duration> class hh_mm_ss {
      public:
        static constexpr unsigned fractional_width = /* veja a descrição */;
        using precision                            = /* veja a descrição */;
     
        constexpr hh_mm_ss() noexcept : hh_mm_ss{Duration::zero()} {}
        constexpr explicit hh_mm_ss(Duration d);
     
        constexpr bool is_negative() const noexcept;
        constexpr chrono::hours hours() const noexcept;
        constexpr chrono::minutes minutes() const noexcept;
        constexpr chrono::seconds seconds() const noexcept;
        constexpr precision subseconds() const noexcept;
     
        constexpr explicit operator precision() const noexcept;
        constexpr precision to_duration() const noexcept;
     
      private:
        bool            is_neg;     // apenas para exposição
        chrono::hours   h;          // apenas para exposição
        chrono::minutes m;          // apenas para exposição
        chrono::seconds s;          // apenas para exposição
        precision       ss;         // apenas para exposição
      };
    }
```

#### Class [std::chrono::tzdb](<#/doc/chrono/tzdb>)
```cpp
    namespace std::chrono {
      struct tzdb {
        string                 version;
        vector<time_zone>      zones;
        vector<time_zone_link> links;
        vector<leap_second>    leap_seconds;
     
        const time_zone* locate_zone(string_view tz_name) const;
        const time_zone* current_zone() const;
      };
    }
```

#### Class [std::chrono::tzdb_list](<#/doc/chrono/tzdb_list>)
```cpp
    namespace std::chrono {
      class tzdb_list {
      public:
        tzdb_list(const tzdb_list&) = delete;
        tzdb_list& operator=(const tzdb_list&) = delete;
     
        // construtores adicionais não especificados
     
        class const_iterator;
     
        const tzdb& front() const noexcept;
     
        const_iterator erase_after(const_iterator p);
     
        const_iterator begin() const noexcept;
        const_iterator end()   const noexcept;
     
        const_iterator cbegin() const noexcept;
        const_iterator cend()   const noexcept;
      };
    }
```

#### Class [std::chrono::nonexistent_local_time](<#/doc/chrono/nonexistent_local_time>)
```cpp
    namespace std::chrono {
      class nonexistent_local_time : public runtime_error {
      public:
        template<class Duration>
          nonexistent_local_time(const local_time<Duration>& tp, const local_info& i);
      };
    }
```

#### Class [std::chrono::ambiguous_local_time](<#/doc/chrono/ambiguous_local_time>)
```cpp
    namespace std::chrono {
      class ambiguous_local_time : public runtime_error {
      public:
        template<class Duration>
          ambiguous_local_time(const local_time<Duration>& tp, const local_info& i);
      };
    }
```

#### Class [std::chrono::sys_info](<#/doc/chrono/sys_info>)
```cpp
    namespace std::chrono {
      struct sys_info {
        sys_seconds   begin;
        sys_seconds   end;
        seconds       offset;
        minutes       save;
        string        abbrev;
      };
    }
```

#### Class [std::chrono::local_info](<#/doc/chrono/local_info>)
```cpp
    namespace std::chrono {
      struct local_info {
        static constexpr int unique      = 0;
        static constexpr int nonexistent = 1;
        static constexpr int ambiguous   = 2;
     
        int result;
        sys_info first;
        sys_info second;
      };
    }
```

#### Class [std::chrono::time_zone](<#/doc/chrono/time_zone>)
```cpp
    namespace std::chrono {
      class time_zone {
      public:
        time_zone(time_zone&&) = default;
        time_zone& operator=(time_zone&&) = default;
     
        // construtores adicionais não especificados
     
        string_view name() const noexcept;
     
        template<class Duration> sys_info   get_info(const sys_time<Duration>& st)   const;
        template<class Duration> local_info get_info(const local_time<Duration>& tp) const;
     
        template<class Duration>
          sys_time<common_type_t<Duration, seconds>>
            to_sys(const local_time<Duration>& tp) const;
     
        template<class Duration>
          sys_time<common_type_t<Duration, seconds>>
            to_sys(const local_time<Duration>& tp, choose z) const;
     
        template<class Duration>
          local_time<common_type_t<Duration, seconds>>
            to_local(const sys_time<Duration>& tp) const;
      };
    }
```

#### Class template [std::chrono::zoned_traits](<#/doc/chrono/zoned_traits>)
```cpp
    namespace std::chrono {
      template<class T> struct zoned_traits {};
     
      template<> struct zoned_traits<const time_zone*> {
        static const time_zone* default_zone();
        static const time_zone* locate_zone(string_view name);
      };
    }
```

#### Class template [std::chrono::zoned_time](<#/doc/chrono/zoned_time>)
```cpp
    namespace std::chrono {
      template<class Duration, class TimeZonePtr = const time_zone*>
      class zoned_time {
      public:
        using duration = common_type_t<Duration, seconds>;
     
      private:
        TimeZonePtr        zone_;                   // apenas para exposição
        sys_time<duration> tp_;                     // apenas para exposição
     
        using traits = zoned_traits<TimeZonePtr>;   // apenas para exposição
     
      public:
        zoned_time();
        zoned_time(const zoned_time&) = default;
        zoned_time& operator=(const zoned_time&) = default;
     
        zoned_time(const sys_time<Duration>& st);
        explicit zoned_time(TimeZonePtr z);
        explicit zoned_time(string_view name);
     
        template<class Duration2>
          zoned_time(const zoned_time<Duration2, TimeZonePtr>& zt);
     
        zoned_time(TimeZonePtr z,    const sys_time<Duration>& st);
        zoned_time(string_view name, const sys_time<Duration>& st);
     
        zoned_time(TimeZonePtr z,    const local_time<Duration>& tp);
        zoned_time(string_view name, const local_time<Duration>& tp);
        zoned_time(TimeZonePtr z,    const local_time<Duration>& tp, choose c);
        zoned_time(string_view name, const local_time<Duration>& tp, choose c);
     
        template<class Duration2, class TimeZonePtr2>
          zoned_time(TimeZonePtr z, const zoned_time<Duration2, TimeZonePtr2>& zt);
        template<class Duration2, class TimeZonePtr2>
          zoned_time(TimeZonePtr z, const zoned_time<Duration2, TimeZonePtr2>& zt, choose);
     
        template<class Duration2, class TimeZonePtr2>
          zoned_time(string_view name, const zoned_time<Duration2, TimeZonePtr2>& zt);
        template<class Duration2, class TimeZonePtr2>
          zoned_time(string_view name, const zoned_time<Duration2, TimeZonePtr2>& zt, choose);
     
        zoned_time& operator=(const sys_time<Duration>& st);
        zoned_time& operator=(const local_time<Duration>& ut);
     
        operator sys_time<duration>() const;
        explicit operator local_time<duration>() const;
     
        TimeZonePtr          get_time_zone()  const;
        local_time<duration> get_local_time() const;
        sys_time<duration>   get_sys_time()   const;
        sys_info             get_info()       const;
      };
     
      zoned_time() -> zoned_time<seconds>;
     
      template<class Duration>
        zoned_time(sys_time<Duration>)
          -> zoned_time<common_type_t<Duration, seconds>>;
     
      template<class TimeZonePtrOrName>
        using /*representação-fuso-horário*/ =        // apenas para exposição
          conditional_t<is_convertible_v<TimeZonePtrOrName, string_view>,
                        const time_zone*,
                        remove_cvref_t<TimeZonePtrOrName>>;
     
      template<class TimeZonePtrOrName>
        zoned_time(TimeZonePtrOrName&&)
          -> zoned_time<seconds, /*representação-fuso-horário*/<TimeZonePtrOrName>>;
     
      template<class TimeZonePtrOrName, class Duration>
        zoned_time(TimeZonePtrOrName&&, sys_time<Duration>)
          -> zoned_time<common_type_t<Duration, seconds>,
                        /*representação-fuso-horário*/<TimeZonePtrOrName>>;
     
      template<class TimeZonePtrOrName, class Duration>
        zoned_time(TimeZonePtrOrName&&, local_time<Duration>,
                   choose = choose::earliest)
          -> zoned_time<common_type_t<Duration, seconds>,
                        /*representação-fuso-horário*/<TimeZonePtrOrName>>;
     
      template<class Duration, class TimeZonePtrOrName, class TimeZonePtr2>
        zoned_time(TimeZonePtrOrName&&, zoned_time<Duration, TimeZonePtr2>,
                   choose = choose::earliest)
          -> zoned_time<common_type_t<Duration, seconds>,
                        /*representação-fuso-horário*/<TimeZonePtrOrName>>;
    }
```

#### Class [std::chrono::leap_second](<#/doc/chrono/leap_second>)
```cpp
    namespace std::chrono {
      class leap_second {
      public:
        leap_second(const leap_second&)            = default;
        leap_second& operator=(const leap_second&) = default;
     
        // construtores adicionais não especificados
     
        constexpr sys_seconds date() const noexcept;
        constexpr seconds value() const noexcept;
      };
    }
```

#### Class [std::chrono::time_zone_link](<#/doc/chrono/time_zone_link>)
```cpp
    namespace std::chrono {
      class time_zone_link {
      public:
        time_zone_link(time_zone_link&&)            = default;
        time_zone_link& operator=(time_zone_link&&) = default;
     
        // construtores adicionais não especificados
     
        string_view name()   const noexcept;
        string_view target() const noexcept;
      };
    }
```

#### Class template [`_local-time-format-t_`](<#/doc/chrono/local_t/formatter>)
```cpp
    namespace std::chrono {
      template<class Duration> struct /*local-time-format-t*/ {       // apenas para exposição
        local_time<Duration> time;                                    // apenas para exposição
        const string* abbrev;                                         // apenas para exposição
        const seconds* offset_sec;                                    // apenas para exposição
      };
    }
```