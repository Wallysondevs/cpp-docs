# std::thread::id

Definido no cabeçalho `[<thread>](<#/doc/header/thread>)`

```c
class thread::id;
```

A classe `thread::id` é uma classe leve e trivially copyable que serve como um identificador único de objetos [std::thread](<#/doc/thread/thread>) e [std::jthread](<#/doc/thread/jthread>)(desde C++20).

Instâncias desta classe também podem conter o valor especial distinto que não representa nenhuma thread. Uma vez que uma thread tenha terminado, o valor de `std::thread::id` pode ser reutilizado por outra thread.

Esta classe é projetada para ser usada como chave em contêineres associativos, tanto ordenados quanto não ordenados.

### Funções membro

[ (construtor)](<#/doc/thread/thread/id/id>) | constrói um id que não representa uma thread
(função membro pública)

### Funções não-membro

[ operator==operator!=operator<operator<=operator>operator>=operator<=>](<#/doc/thread/thread/id/operator_cmp>)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(removido em C++20)(C++20) | compara dois objetos `thread::id`
(função)
[ operator<<](<#/doc/thread/thread/id/operator_ltlt>) | serializa um objeto `thread::id`
(modelo de função)

### Classes auxiliares

[ std::hash<std::thread::id>](<#/doc/thread/thread/id/hash>)(C++11) | suporte a hash para `std::thread::id`
(especialização de modelo de classe)
[ std::formatter<std::thread::id>](<#/doc/thread/thread/id/formatter>)(C++23) | suporte a formatação para `thread::id`
(especialização de modelo de classe)

### Veja também

[ get_id](<#/doc/thread/thread/get_id>) | retorna o _id_ da thread
(função membro pública)
[ get_id](<#/doc/thread/get_id>)(C++11) | retorna o id da thread atual
(função)