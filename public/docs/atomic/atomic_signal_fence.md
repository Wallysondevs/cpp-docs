# std::atomic_signal_fence

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
extern "C" void atomic_signal_fence( std::memory_order order ) noexcept;
```

  
Estabelece a ordenação de sincronização de memória de acessos não atômicos e atômicos relaxados, conforme instruído por `order`, entre uma thread e um manipulador de sinal (signal handler) executado na mesma thread. Isso é equivalente a [std::atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>), exceto que nenhuma instrução de CPU para ordenação de memória é emitida. Apenas o reordenamento das instruções pelo compilador é suprimido conforme `order` instrui. Por exemplo, uma fence com semântica de release impede que leituras ou escritas sejam movidas para além de escritas subsequentes, e uma fence com semântica de acquire impede que leituras ou escritas sejam movidas para antes de leituras precedentes. 

### Parâmetros

order  |  \-  |  a ordenação de memória executada por esta fence   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ memory_order](<#/doc/atomic/memory_order>)(C++11) |  define restrições de ordenação de memória para a operação atômica fornecida   
(enum)  
[ atomic_thread_fence](<#/doc/atomic/atomic_thread_fence>)(C++11) |  primitiva de sincronização de fence genérica dependente da ordenação de memória   
(função)  
[Documentação C](<#/>) para atomic_signal_fence