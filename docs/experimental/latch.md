# std::experimental::latch

Definido no cabeçalho `[<experimental/latch>](<https://en.cppreference.com/mwiki/index.php?title=cpp/header/experimental/latch&action=edit&redlink=1> "cpp/header/experimental/latch \(page does not exist\)")`

```c
class latch;
```

  
A classe `latch` é um contador decrescente do tipo `ptrdiff_t` que pode ser usado para sincronizar threads. O valor do contador é inicializado na criação. Threads podem bloquear no latch até que o contador seja decrementado para zero. Não há possibilidade de aumentar ou redefinir o contador, o que torna o latch uma barreira de uso único. 

Ao contrário de [`std::experimental::barrier`](<#/doc/experimental/barrier>), `std::experimental::latch` pode ser decrementado por uma thread participante mais de uma vez. 

### Funções membro

[ (construtor)](<#/doc/experimental/latch/latch>) |  constrói um `latch`   
(função membro pública)  
[ (destrutor)](<#/doc/experimental/latch/~latch>) |  destrói o latch   
(função membro pública)  
operator=[deleted] |  não copiável por atribuição   
(função membro pública)  
[ count_down_and_wait](<#/doc/experimental/latch/count_down_and_wait>) |  decrementa o contador em `1` e bloqueia até que ele atinja zero   
(função membro pública)  
[ count_down](<#/doc/experimental/latch/count_down>) |  decrementa o contador de forma não bloqueante   
(função membro pública)  
[ is_ready](<#/doc/experimental/latch/is_ready>) |  testa se o contador interno é igual a zero   
(função membro pública)  
[ wait](<#/doc/experimental/latch/wait>) |  bloqueia até que o contador atinja zero   
(função membro pública)