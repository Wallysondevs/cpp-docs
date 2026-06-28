# std::atomic_is_lock_free, ATOMIC_xxx_LOCK_FREE

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
template< class T >
bool atomic_is_lock_free( const volatile std::atomic<T>* obj ) noexcept;
template< class T >
bool atomic_is_lock_free( const std::atomic<T>* obj ) noexcept;
#define ATOMIC_BOOL_LOCK_FREE /* unspecified */
#define ATOMIC_CHAR_LOCK_FREE /* unspecified */
#define ATOMIC_CHAR16_T_LOCK_FREE /* unspecified */
#define ATOMIC_CHAR32_T_LOCK_FREE /* unspecified */
#define ATOMIC_WCHAR_T_LOCK_FREE /* unspecified */
#define ATOMIC_SHORT_LOCK_FREE /* unspecified */
#define ATOMIC_INT_LOCK_FREE /* unspecified */
#define ATOMIC_LONG_LOCK_FREE /* unspecified */
#define ATOMIC_LLONG_LOCK_FREE /* unspecified */
#define ATOMIC_POINTER_LOCK_FREE /* unspecified */
#define ATOMIC_CHAR8_T_LOCK_FREE /* unspecified */
```

1,2) Determina se o objeto atômico apontado por obj é implementado sem bloqueio (lock-free), como se chamasse obj->is_lock_free(). Em qualquer execução de programa, o resultado da consulta lock-free é o mesmo para todos os objetos atômicos do mesmo tipo.

3,4) Expande para uma expressão constante inteira com valor

  * ​0​ para os tipos atômicos embutidos que nunca são lock-free,
  * 1 para os tipos atômicos embutidos que são _às vezes_ lock-free,
  * 2 para os tipos atômicos embutidos que são sempre lock-free.

### Parâmetros

- **obj** — ponteiro para o objeto atômico a ser examinado

### Valor de retorno

true se *obj for um atômico lock-free, false caso contrário.

### Notas

Todos os tipos atômicos, exceto [std::atomic_flag](<#/doc/atomic/atomic_flag>), podem ser implementados usando mutexes ou outras operações de bloqueio, em vez de usar as instruções de CPU atômicas lock-free. Tipos atômicos também podem ser _às vezes_ lock-free: por exemplo, se apenas algumas subarquiteturas suportam acesso atômico lock-free para um determinado tipo (como a instrução CMPXCHG16B em x86-64), se os atômicos são lock-free pode não ser conhecido até o tempo de execução.

O padrão C++ recomenda (mas não exige) que as operações atômicas lock-free também sejam address-free, ou seja, adequadas para comunicação entre processos usando memória compartilhada.

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    #include <utility>
    
    struct A { int a[100]; };
    struct B { int x, y; };
    
    int main()
    {
        std::atomic<A> a;
        std::atomic<B> b;
        std::cout << std::boolalpha
                  << "std::atomic<A> is lock free? "
                  << std::atomic_is_lock_free(&a) << '\n'
                  << "std::atomic<B> is lock free? "
                  << std::atomic_is_lock_free(&b) << '\n';
    }
```

Saída possível:
```
    std::atomic<A> is lock free? false
    std::atomic<B> is lock free? true
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3249](<https://cplusplus.github.io/LWG/issue3249>) | C++11 | `atomic_is_lock_free` foi especificado via ponteiros, o que era ambíguo e poderia aceitar valores de ponteiro inválidos | especificado via objetos atômicos

### Veja também

[ is_lock_free](<#/doc/atomic/atomic/is_lock_free>) | verifica se o objeto atômico é lock-free
(função membro pública de `std::atomic<T>`)
[ atomic_flag](<#/doc/atomic/atomic_flag>)(C++11) | o tipo atômico booleano lock-free
(classe)
[ is_always_lock_free](<#/doc/atomic/atomic/is_lock_free>)[static] (C++17) | indica que o tipo é sempre lock-free
(constante membro estática pública de `std::atomic<T>`)
[ std::atomic_is_lock_free(std::shared_ptr)](<#/doc/memory/shared_ptr/atomic>)(obsoleto em C++20)(removido em C++26) | especializa operações atômicas para [std::shared_ptr](<#/doc/memory/shared_ptr>)
(modelo de função)
[Documentação C](<#/>) para atomic_is_lock_free
[Documentação C](<#/>) para ATOMIC_*_LOCK_FREE