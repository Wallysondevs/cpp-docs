# ATOMIC_VAR_INIT

Definido no cabeçalho `[<atomic>](<#/doc/header/atomic>)`

```c
#define ATOMIC_VAR_INIT(value) /* implementation-defined */
(obsoleto desde C++20)
```

Expande para uma expressão que pode ser usada para inicializar um objeto [std::atomic](<#/doc/atomic/atomic>) que pode ser inicializado a partir de `value`. Se o objeto atomic tiver duração de armazenamento estática, esta inicialização é [inicialização constante](<#/doc/language/constant_initialization>).

### Notas

Acessar a variável durante a inicialização a partir de outra thread, mesmo através de uma operação atômica, é uma condição de corrida (data race) (isso pode acontecer se o endereço for imediatamente passado para outra thread com uma operação [std::memory_order_relaxed](<#/doc/atomic/memory_order>))

Esta macro é fornecida principalmente para compatibilidade com C; ela se comporta da mesma forma que o construtor de [std::atomic](<#/doc/atomic/atomic>).

### Exemplo

Execute este código
```cpp
    #include <atomic>
    #include <iostream>
    
    int main()
    {
        std::atomic<int> a = ATOMIC_VAR_INIT(1);
        // std::atomic<int> a(1);   // C++-only alternative
        std::cout << "Initialized std::atomic<int> as: " << a << '\n';
    }
```

Saída:
```
    Initialized std::atomic<int> as: 1
```

### Veja também

[ atomic_init](<#/doc/atomic/atomic_init>)(C++11)(obsoleto desde C++20) | inicialização não atômica de um objeto atômico construído por padrão
(modelo de função)
[ (construtor)](<#/doc/atomic/atomic/atomic>) | constrói um objeto atomic
(função membro pública de `std::atomic<T>`)
[Documentação C](<#/>) para ATOMIC_VAR_INIT