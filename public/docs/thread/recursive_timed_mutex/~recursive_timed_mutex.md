# std::recursive_timed_mutex::~recursive_timed_mutex

~recursive_timed_mutex();

  
Destrói o mutex. 

O comportamento é indefinido se o mutex for possuído por qualquer thread ou se qualquer thread terminar enquanto detiver qualquer posse do mutex. 

### Veja também

[Documentação C](<#/>) para mtx_destroy  
---