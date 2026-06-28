# std::atomic_ref&lt;T&gt;::is_lock_free

```cpp
bool is_lock_free() const noexcept;  // (desde C++20)
```

Verifica se as operações atômicas neste objeto são *lock-free*.

### Parâmetros

(nenhum)

### Valor de retorno

`true` se as operações atômicas neste objeto são *lock-free*, `false` caso contrário.

### Notas

Todos os tipos atômicos, exceto [std::atomic_flag](<#/doc/atomic/atomic_flag>), podem ser implementados usando mutexes ou outras operações de travamento, em vez de usar as instruções de CPU atômicas *lock-free*. Tipos atômicos também podem ser *lock-free* _às vezes_, por exemplo, se apenas acessos de memória alinhados são naturalmente atômicos em uma dada arquitetura, objetos desalinhados do mesmo tipo devem usar travas.

O padrão C++ recomenda (mas não exige) que as operações atômicas *lock-free* também sejam *address-free*, ou seja, adequadas para comunicação entre processos usando memória compartilhada.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ is_always_lock_free](<#/doc/atomic/atomic_ref/is_always_lock_free>)[static] | indica que o tipo é sempre *lock-free*
(constante membro estática pública)