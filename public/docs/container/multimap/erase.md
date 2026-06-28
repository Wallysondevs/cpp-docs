# std::multimap&lt;Key,T,Compare,Allocator&gt;::erase

```cpp
iterator erase( iterator pos );  // (1)
iterator erase( const_iterator pos );  // (2) (desde C++11)
  // (3)
iterator erase( iterator first, iterator last ); | | (ate C++11)
iterator erase( const_iterator first, const_iterator last );  // (desde C++11)
size_type erase( const Key& key );  // (4)
template< class K >
size_type erase( K&& x );  // (5) (desde C++23)
```

Remove os elementos especificados do container. A ordem dos elementos equivalentes restantes é preservada.

1,2) Remove o elemento em pos.

3) Remove os elementos no range `[`first`, `last`)`, que deve ser um range válido em *this.

4) Remove todos os elementos com a key equivalente a key.

5) Remove todos os elementos com key que se compara _equivalente_ ao valor x. Esta sobrecarga participa da resolução de sobrecarga apenas se o qualified-id Compare::is_transparent for válido e denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Ela permite chamar esta função sem construir uma instância de `Key`.

Referências e iterators para os elementos apagados são invalidados. Outras referências e iterators não são afetados.

O iterator pos deve ser válido e dereferenciável. Assim, o iterator [end()](<#/doc/container/multimap/end>) (que é válido, mas não é dereferenciável) não pode ser usado como valor para pos.

### Parâmetros

- **pos** — iterator para o elemento a ser removido
- **first, last** — range de elementos a serem removidos
- **key** — valor da key dos elementos a serem removidos
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma key denotando os elementos a serem removidos

### Valor de retorno

1-3) Iterator que segue o último elemento removido.

4) Número de elementos removidos.

5) Número de elementos removidos.

### Exceções

1-3) Não lança exceções.

4,5) Quaisquer exceções lançadas pelo objeto `Compare`.

### Complexidade

Dada uma instância c de `multimap`:

1,2) Constante amortizada

3) log(c.size()) + [std::distance](<#/doc/iterator/distance>)(first, last)

4) log(c.size()) + c.count(key)

5) log(c.size()) + c.count(x)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_associative_heterogeneous_erasure`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | Remoção heterogênea em [containers associativos](<#/doc/container>) e [containers associativos não ordenados](<#/doc/container>); sobrecarga ([5](<#/doc/container/multimap/erase>))

### Exemplo

Execute este código
```cpp
    #include <map>
    #include <iostream>
    
    int main()
    {
        std::multimap<int, std::string> c =
        {
            {1, "one"}, {2, "two"}, {3, "three"},
            {4, "four"}, {5, "five"}, {6, "six"}
        };
    
        // erase all odd numbers from c
        for (auto it = c.begin(); it != c.end();)
        {
            if (it->first % 2 != 0)
                it = c.erase(it);
            else
                ++it;
        }
    
        for (auto& p : c)
            std::cout << p.second << ' ';
        std::cout << '\n';
    }
```

Output:
```
    two four six
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
---|---|---|---
[LWG 130](<https://cplusplus.github.io/LWG/issue130>) | C++98 | o tipo de retorno das sobrecargas (1) e (3) era void (não é consistente com o requisito de `erase()` em sequence containers) | corrigido para `iterator`
[LWG 371](<https://cplusplus.github.io/LWG/issue371>) | C++98 | a ordem dos elementos equivalentes que não são apagados não era garantida de ser preservada | exigido que seja preservada
[LWG 2059](<https://cplusplus.github.io/LWG/issue2059>) | C++11 | substituir a sobrecarga (1) pela sobrecarga (2) introduziu nova ambiguidade | adicionada a sobrecarga (1) de volta

### Veja também

[ clear](<#/doc/container/multimap/clear>) | limpa o conteúdo
(função membro pública)