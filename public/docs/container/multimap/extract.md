# std::multimap&lt;Key,T,Compare,Allocator&gt;::extract

```cpp
node_type extract( const_iterator position );  // (1) (desde C++17)
node_type extract( const Key& k );  // (2) (desde C++17)
template< class K >
node_type extract( K&& x );  // (3) (desde C++23)
```

1) Desvincula o nó que contém o elemento apontado por position e retorna um [node handle](<#/doc/container/node_handle>) que o possui.

2) Se o container tiver um elemento com chave equivalente a k, desvincula o nó que contém o primeiro elemento desse tipo do container e retorna um [node handle](<#/doc/container/node_handle>) que o possui. Caso contrário, retorna um node handle vazio.

3) O mesmo que (2). Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo, e nem `iterator` nem `const_iterator` são implicitamente conversíveis de `K`. Permite chamar esta função sem construir uma instância de `Key`.

Em ambos os casos, nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados (o rebalanceamento pode ocorrer, assim como com [erase()](<#/doc/container/multimap/erase>)).

Extrair um nó invalida apenas os iterators para o elemento extraído. Ponteiros e referências para o elemento extraído permanecem válidos, mas não podem ser usados enquanto o elemento for possuído por um node handle: eles se tornam utilizáveis se o elemento for inserido em um container.

### Parameters

- **position** — um iterator válido neste container
- **k** — uma chave para identificar o nó a ser extraído
- **x** — um valor de qualquer tipo que possa ser comparado transparentemente com uma chave que identifica o nó a ser extraído

### Return value

Um [node handle](<#/doc/container/node_handle>) que possui o elemento extraído, ou um node handle vazio caso o elemento não seja encontrado em (2,3).

### Exceptions

1) Não lança exceções.

2,3) Quaisquer exceções lançadas pelo objeto `Compare`.

### Complexity

1) Constante amortizada.

2,3) log([size()](<#/doc/container/multimap/size>))

### Notes

extract é a única maneira de alterar uma chave de um elemento de map sem realocação:
```cpp
    std::map<int, std::string> m{{1, "mango"}, {2, "papaya"}, {3, "guava"}};
    auto nh = m.extract(2);
    nh.key() = 4;
    m.insert(std::move(nh));
    // m == {{1, "mango"}, {3, "guava"}, {4, "papaya"}}
```

[Feature-test](<#/doc/utility/feature_test>) macro | Value | Std | Feature
---|---|---|---
[`__cpp_lib_associative_heterogeneous_erasure`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | Remoção heterogênea em [containers associativos](<#/doc/container>) e [containers associativos não ordenados](<#/doc/container>), ([3](<#/doc/container/multimap/extract>))

### Example

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    #include <map>
     
    void print(std::string_view comment, const auto& data)
    {
        std::cout << comment;
        for (auto [k, v] : data)
            std::cout << ' ' << k << '(' << v << ')';
     
        std::cout << '\n';
    }
     
    int main()
    {
        std::multimap<int, char> cont{{1, 'a'}, {2, 'b'}, {3, 'c'}};
     
        print("Start:", cont);
     
        // Extrai o node handle e altera a chave
        auto nh = cont.extract(1);
        nh.key() = 4;
     
        print("After extract and before insert:", cont);
     
        // Insere o node handle de volta
        cont.insert(std::move(nh));
     
        print("End:", cont);
    }
```

Saída:
```
    Start: 1(a) 2(b) 3(c)
    After extract and before insert: 2(b) 3(c)
    End: 2(b) 3(c) 4(a)
```

### See also

[ merge](<#/doc/container/multimap/merge>)(C++17) | une nós de outro container
(função membro pública)
[ insert](<#/doc/container/multimap/insert>) | insere elementos ou nós (desde C++17)
(função membro pública)
[ erase](<#/doc/container/multimap/erase>) | apaga elementos
(função membro pública)