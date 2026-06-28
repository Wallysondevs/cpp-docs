# std::experimental::atomic_shared_ptr

Definido no cabeçalho `[<experimental/atomic>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/atomic&action=edit&redlink=1> "cpp/header/experimental/atomic \(page does not exist\)")`

```c
template< class T >
class atomic_shared_ptr;
```

O template de classe `atomic_shared_ptr` fornece operações atômicas de ponteiro thread-safe sobre um [std::shared_ptr](<#/doc/memory/shared_ptr>). Ele oferece uma alternativa melhor para [as funções de acesso atômico `shared_ptr` não-membro](<#/doc/memory/shared_ptr/atomic>).

### Funções membro

[ (constructor)](<#/doc/experimental/atomic_shared_ptr/atomic_shared_ptr>) | constrói um objeto `atomic_shared_ptr`
(função membro pública)
[ operator=](<#/>) | armazena um valor em um objeto `atomic_shared_ptr`
(função membro pública)
[ is_lock_free](<#/doc/experimental/atomic_shared_ptr/is_lock_free>) | verifica se o objeto `atomic_shared_ptr` é lock-free
(função membro pública)
[ store](<#/doc/experimental/atomic_shared_ptr/store>) | substitui atomicamente o valor do objeto atômico por um argumento não-atômico
(função membro pública)
[ load](<#/doc/experimental/atomic_shared_ptr/load>) | obtém atomicamente o valor do objeto atômico
(função membro pública)
[ operator shared_ptr&lt;T&gt;](<#/doc/experimental/atomic_shared_ptr/operator_shared_ptr>) | carrega um valor de um objeto atômico
(função membro pública)
[ exchange](<#/doc/experimental/atomic_shared_ptr/exchange>) | substitui atomicamente o valor do objeto atômico e obtém o valor mantido anteriormente
(função membro pública)
[ compare_exchange_weakcompare_exchange_strong](<#/doc/experimental/atomic_shared_ptr/compare_exchange>) | compara atomicamente o valor do objeto atômico com um argumento não-atômico e realiza uma troca atômica se iguais ou um carregamento atômico se não
(função membro pública)