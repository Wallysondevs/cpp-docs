# std::pointer_safety

Definido no cabeçalho `[<memory>](<#/doc/header/memory>)`

```c
enum class pointer_safety {
relaxed,
preferred,
strict
};
(removido em C++23)
```

O tipo de enumeração com escopo `pointer_safety` lista os modos de segurança de ponteiro suportados por C++.

### Constantes de enumeração

`pointer_safety::strict` | Apenas ponteiros derivados com segurança (ponteiros para objetos alocados com new ou subobjetos destes) podem ser desreferenciados ou desalocados. Um coletor de lixo pode estar ativo.
---|---
`pointer_safety::preferred` | Todos os ponteiros são considerados válidos e podem ser desreferenciados ou desalocados. Um detector de vazamento baseado em alcançabilidade pode estar ativo.
`pointer_safety::relaxed` | Todos os ponteiros são considerados válidos e podem ser desreferenciados ou desalocados.

### Ver também

[ get_pointer_safety](<#/doc/memory/gc/get_pointer_safety>)(C++11)(removido em C++23) | retorna o modelo atual de segurança de ponteiro
(função)