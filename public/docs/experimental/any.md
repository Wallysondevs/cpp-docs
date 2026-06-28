# std::experimental::any

Definido no header `[<experimental/any>](<#/doc/header/experimental/any>)`

```cpp
class any;
```

  
A classe `any` descreve um container type-safe para valores únicos de qualquer tipo. 

1) Um objeto da classe `any` armazena uma instância de qualquer tipo que satisfaça os requisitos do construtor ou está vazio, e isso é referido como o _estado_ do objeto da classe `any`. A instância armazenada é chamada de objeto contido. Dois estados são equivalentes se ambos estiverem vazios ou se ambos não estiverem vazios e se os objetos contidos forem equivalentes.

2) As funções `any_cast` não-membro fornecem acesso type-safe ao objeto contido.

As implementações são encorajadas a evitar alocações dinâmicas para objetos pequenos, mas tal otimização só pode ser aplicada a tipos para os quais [std::is_nothrow_move_constructible](<#/doc/types/is_move_constructible>) retorna true. 

### Funções membro

[ (construtor)](<#/doc/experimental/any/any>) |  constrói um objeto `any`   
(função membro pública)  
[ operator=](<#/>) |  atribui um objeto `any`   
(função membro pública)  
[ (destrutor)](<#/doc/experimental/any/~any>) |  destrói um objeto `any`   
(função membro pública)  
  
#####  Modificadores   
  
[ clear](<#/doc/experimental/any/clear>) |  destrói o objeto contido   
(função membro pública)  
[ swap](<#/doc/experimental/any/swap>) |  troca dois objetos `any`   
(função membro pública)  
  
#####  Observadores   
  
[ empty](<#/doc/experimental/any/empty>) |  verifica se o objeto contém um valor   
(função membro pública)  
[ type](<#/doc/experimental/any/type>) |  retorna o `typeid` do valor contido   
(função membro pública)  
  
### Funções não-membro

[ swap](<#/doc/experimental/any/swap2>) |  troca duas instâncias `any`   
(função)  
[ any_cast](<#/doc/experimental/any/any_cast>) |  acesso type-safe ao objeto contido   
(template de função)  
  
### Classes auxiliares

[ bad_any_cast](<#/doc/experimental/any/bad_any_cast>)(library fundamentals TS) |  exceção lançada pelas formas de `any_cast` que retornam valor em caso de incompatibilidade de tipo   
(classe)  