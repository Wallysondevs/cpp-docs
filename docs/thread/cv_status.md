# std::cv_status

Definido no header `[<condition_variable>](<#/doc/header/condition_variable>)`

```cpp
enum class cv_status {
no_timeout,
timeout
};  // (desde C++11)
```

A enumeração com escopo `std::cv_status` descreve se uma espera com tempo limite retornou devido a um timeout ou não.

`std::cv_status` é usado pelas funções membro `wait_for` e `wait_until` de [std::condition_variable](<#/doc/thread/condition_variable>) e [std::condition_variable_any](<#/doc/thread/condition_variable_any>).

### Constantes membro

Nome | Explicação
---|---
`no_timeout` | a condition variable foi despertada com `notify_all`, `notify_one`, ou espuriamente
`timeout` | a condition variable foi despertada pela expiração do tempo limite

### Veja também

[ wait_for](<#/doc/thread/condition_variable/wait_for>) | bloqueia a thread atual até que a condition variable seja despertada ou após a duração de tempo limite especificada
(função membro pública de `std::condition_variable`)
[ wait_for](<#/doc/thread/condition_variable_any/wait_for>) | bloqueia a thread atual até que a condition variable seja despertada ou após a duração de tempo limite especificada
(função membro pública de `std::condition_variable_any`)
[ wait_until](<#/doc/thread/condition_variable/wait_until>) | bloqueia a thread atual até que a condition variable seja despertada ou até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::condition_variable`)
[ wait_until](<#/doc/thread/condition_variable_any/wait_until>) | bloqueia a thread atual até que a condition variable seja despertada ou até que o ponto no tempo especificado tenha sido atingido
(função membro pública de `std::condition_variable_any`)