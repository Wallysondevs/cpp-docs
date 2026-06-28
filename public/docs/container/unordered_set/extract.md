# std::unordered_set&lt;Key,Hash,KeyEqual,Allocator&gt;::extract

```cpp
node_type extract( const_iterator position );  // (1) (desde C++17)
node_type extract( const Key& k );  // (2) (desde C++17)
template< class K >
node_type extract( K&& x );  // (3) (desde C++23)
```

1) Desvincula o nó que contém o elemento apontado por `position` e retorna um [node handle](<#/doc/container/node_handle>) que o possui.

2) Se o container possui um elemento com chave equivalente a `k`, desvincula o nó que contém esse elemento do container e retorna um [node handle](<#/doc/container/node_handle>) que o possui. Caso contrário, retorna um node handle vazio.

3) O mesmo que (2). Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Em ambos os casos, nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados.

Extrair um nó invalida apenas os iterators para o elemento extraído, e preserva a ordem relativa dos elementos que não são apagados. Ponteiros e referências para o elemento extraído permanecem válidos, mas não podem ser usados enquanto o elemento for possuído por um node handle: eles se tornam utilizáveis se o elemento for inserido em um container.

### Parâmetros

- **position** — um iterator válido neste container
- **k** — uma chave para identificar o nó a ser extraído
- **x** — um valor de qualquer tipo que pode ser comparado de forma transparente com uma chave que identifica o nó a ser extraído

### Valor de retorno

Um [node handle](<#/doc/container/node_handle>) que possui o elemento extraído, ou um node handle vazio caso o elemento não seja encontrado em (2,3).

### Exceções

1) Não lança exceções.

2,3) Quaisquer exceções lançadas pelos objetos `Hash` e `KeyEqual`.

### Complexidade

1,2,3) Caso médio O(1), pior caso O([size()](<#/doc/container/unordered_set/size>)).

### Observações

`extract` é a única maneira de remover um objeto *move-only* de um conjunto:
```cpp
    std::set<move_only_type> s;
    s.emplace(...);
    move_only_type mot = std::move(s.extract(s.begin()).value());
```

Macro de teste de recurso | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_associative_heterogeneous_erasure`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | Remoção heterogênea em [containers associativos](<#/doc/container>) e [containers associativos não ordenados](<#/doc/container>), ([3](<#/doc/container/unordered_set/extract>))

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    #include <unordered_set>
    
    void print(std::string_view comment, const auto& data)
    {
        std::cout << comment;
        for (auto datum : data)
            std::cout << ' ' << datum;
    
        std::cout << '\n';
    }
    
    int main()
    {
        std::unordered_set<int> cont{1, 2, 3};
    
        print("Start:", cont);
    
        // Extrai o node handle e altera a chave
        auto nh = cont.extract(1);
        nh.value() = 4;
    
        print("After extract and before insert:", cont);
    
        // Insere o node handle de volta
        cont.insert(std::move(nh));
    
        print("End:", cont);
    }
```

Saída possível:
```
    Start: 1 2 3
    After extract and before insert: 2 3
    End: 2 3 4
```

### Veja também

[ merge](<#/doc/container/unordered_set/merge>)(C++17) | une nós de outro container
(função membro pública)
[ insert](<#/doc/container/unordered_set/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ erase](<#/doc/container/unordered_set/erase>) | apaga elementos
(função membro pública)