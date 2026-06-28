# std::type_info

Definido no cabeçalho `[<typeinfo>](<#/doc/header/typeinfo>)`

```c
class type_info;
```

A classe `type_info` contém informações específicas da implementação sobre um tipo, incluindo o nome do tipo e meios para comparar dois tipos quanto à igualdade ou ordem de agrupamento. Esta é a classe retornada pelo operador [`typeid`](<#/doc/language/typeid>).

A classe `type_info` não é nem [CopyConstructible](<#/doc/named_req/CopyConstructible>) nem [CopyAssignable](<#/doc/named_req/CopyAssignable>).

### Funções membro

(construtor)[deleted] | não possui construtores padrão nem de cópia
(função membro pública)
[ (destrutor)](<#/doc/types/type_info/~type_info>)[virtual] | o destrutor virtual torna `type_info` uma classe polimórfica
(função membro pública virtual)
operator=[deleted] | não pode ser atribuído por cópia
(função membro pública)
[ operator==operator!=](<#/doc/types/type_info/operator_cmp>)(removido em C++20) | verifica se os objetos se referem ao mesmo tipo
(função membro pública)
[ before](<#/doc/types/type_info/before>) | verifica se o tipo referido precede o tipo referido de outro objeto `type_info` na ordem definida pela implementação, ou seja, ordena os tipos referidos
(função membro pública)
[ hash_code](<#/doc/types/type_info/hash_code>)(C++11) | retorna um valor que é idêntico para os mesmos tipos
(função membro pública)
[ name](<#/doc/types/type_info/name>) | nome do tipo definido pela implementação
(função membro pública)

### Veja também

[ type_index](<#/doc/types/type_index>)(C++11) | wrapper em torno de um objeto `type_info`, que pode ser usado como índice em containers associativos e associativos não ordenados
(classe)
[`typeid`](<#/doc/language/typeid>) | Consulta informações de um tipo, retornando um objeto `std::type_info` que representa o tipo
(operador embutido)