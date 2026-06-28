# Utilitários de Data e Hora do C

### Funções  
  
Definido no header `[<ctime>](<#/doc/header/ctime>)`  
---  
  
##### Manipulação de Tempo   
  
[ difftime](<#/doc/chrono/c/difftime>) | calcula a diferença entre tempos   
(função)  
[ time](<#/doc/chrono/c/time>) | retorna o tempo atual do sistema como tempo desde a epoch   
(função)  
[ clock](<#/doc/chrono/c/clock>) | retorna o tempo de clock bruto do processador desde o início do programa   
(função)  
[ timespec_get](<#/doc/chrono/c/timespec_get>)(C++17) | retorna o tempo de calendário em segundos e nanossegundos com base em uma dada base de tempo   
(função)  
  
##### Conversões de Formato   
  
[ asctime](<#/doc/chrono/c/asctime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual   
(função)  
[ ctime](<#/doc/chrono/c/ctime>) | converte um objeto [std::time_t](<#/doc/chrono/c/time_t>) para uma representação textual   
(função)  
[ strftime](<#/doc/chrono/c/strftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual personalizada   
(função)  
[ wcsftime](<#/doc/chrono/c/wcsftime>) | converte um objeto [std::tm](<#/doc/chrono/c/tm>) para uma representação textual de wide string personalizada   
(função)  
[ gmtime](<#/doc/chrono/c/gmtime>) | converte o tempo desde a epoch para tempo de calendário expresso como Tempo Universal Coordenado   
(função)  
[ localtime](<#/doc/chrono/c/localtime>) | converte o tempo desde a epoch para tempo de calendário expresso como tempo local   
(função)  
[ mktime](<#/doc/chrono/c/mktime>) | converte o tempo de calendário para tempo desde a epoch   
(função)  
  
### Constantes

[ CLOCKS_PER_SEC](<#/doc/chrono/c/CLOCKS_PER_SEC>) | número de tiques de clock do processador por segundo   
(constante macro)  
  
### Tipos

[ tm](<#/doc/chrono/c/tm>) | tipo de tempo de calendário   
(classe)  
[ time_t](<#/doc/chrono/c/time_t>) | tipo de tempo desde a epoch   
(typedef)  
[ clock_t](<#/doc/chrono/c/clock_t>) | tempo de execução do processo   
(typedef)  
[ timespec](<#/doc/chrono/c/timespec>)(C++17) | tempo em segundos e nanossegundos  
(struct)  
  
### Veja também

[documentação C](<#/>) para utilitários de Data e Hora  
---