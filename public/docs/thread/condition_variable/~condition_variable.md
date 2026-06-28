# std::condition_variable::~condition_variable

```cpp
~condition_variable();  // (desde C++11)
```

  
Destrói o objeto do tipo [std::condition_variable](<#/doc/thread/condition_variable>). 

### Notas

É seguro invocar o destrutor apenas se todas as threads tiverem sido notificadas. Não é exigido que elas tenham saído de suas respectivas funções de espera: algumas threads ainda podem estar esperando para readquirir o lock associado, ou podem estar esperando para serem agendadas para execução após readquiri-lo. 

O programador deve garantir que nenhuma thread tente esperar em *this uma vez que o destrutor tenha sido iniciado, especialmente quando as threads em espera estão chamando as funções de espera em um loop ou estão usando as sobrecargas das funções de espera que aceitam um predicado. 

### Veja também

[Documentação C](<#/>) para cnd_destroy  
---