```cpp
# std::unordered_multimap<Key,T,Hash,KeyEqual,Allocator>::extract

node_type extract( const_iterator position ); |  (1)  |  (desde C++17)  
---|---|---  
node_type extract( const Key& k ); |  (2)  |  (desde C++17)  
template< class K >  
node_type extract( K&& x ); |  (3) | (desde C++23)  
| |   
  
1) Desvincula o nó que contém o elemento apontado por `position` e retorna um node handle que o possui.

2) Se o container tiver um elemento com chave equivalente a `k`, desvincula o nó que contém o primeiro elemento desse tipo do container e retorna um node handle que o possui. Caso contrário, retorna um node handle vazio.

3) O mesmo que (2). Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo, e nem `iterator` nem `const_iterator` for implicitamente conversível de `K`. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Em ambos os casos, nenhum elemento é copiado ou movido, apenas os ponteiros internos dos nós do container são redirecionados.

Extrair um nó invalida apenas os iterators para o elemento extraído, e preserva a ordem relativa dos elementos que não são apagados. Ponteiros e referências para o elemento extraído permanecem válidos, mas não podem ser usados enquanto o elemento for possuído por um node handle: eles se tornam utilizáveis se o elemento for inserido em um container.

### Parâmetros

position  |  \-  |  um iterator válido neste container   
---|---|---  
k  |  \-  |  uma chave para identificar o nó a ser extraído   
x  |  \-  |  um valor de qualquer tipo que pode ser comparado transparentemente com uma chave que identifica o nó a ser extraído   
  
### Valor de retorno

Um node handle que possui o elemento extraído, ou um node handle vazio caso o elemento não seja encontrado em (2,3).

### Exceções

1) Não lança exceções.

2,3) Quaisquer exceções lançadas pelos objetos `Hash` e `KeyEqual`.

### Complexidade

1,2,3) Caso médio O(1), pior caso O(size()).

### Observações

`extract` é a única maneira de mudar uma chave de um elemento de map sem realocação:
```cpp
    std::map<int, std::string> m{{1, "mango"}, {2, "papaya"}, {3, "guava"}};
    auto nh = m.extract(2);
    nh.key() = 4;
    m.insert(std::move(nh));
    // m == {{1, "mango"}, {3, "guava"}, {4, "papaya"}}
```

Macro de teste de recurso | Valor | Padrão | Recurso   
---|---|---|---  
`__cpp_lib_associative_heterogeneous_erasure` | `202110L` | (C++23) | Remoção heterogênea em containers associativos e containers associativos não ordenados, (3)  
  
### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <iostream>
    #include <string_view>
    #include <unordered_map>
    
    void print(std::string_view comment, const auto& data)
    {
        std::cout << comment;
        for (auto [k, v] : data)
            std::cout << ' ' << k << '(' << v << ')';
    
        std::cout << '\n';
    }
    
    int main()
    {
        std::unordered_multimap<int, char> cont{{1, 'a'}, {2, 'b'}, {3, 'c'}};
    
        print("Início:", cont);
    
        // Extrai o node handle e muda a chave
        auto nh = cont.extract(1);
        nh.key() = 4;
    
        print("Após extração e antes da inserção:", cont);
    
        // Insere o node handle de volta
        cont.insert(std::move(nh));
    
        print("Fim:", cont);
    }
```

Saída possível:
```
    Start: 1(a) 2(b) 3(c)
    After extract and before insert: 2(b) 3(c)
    End: 2(b) 3(c) 4(a)
```

### Veja também

 merge(C++17) | une nós de outro container   
(função membro pública)  
---|---  
 insert | insere elementos ou nós (desde C++17)   
(função membro pública)  
 erase | apaga elementos   
(função membro pública)
```