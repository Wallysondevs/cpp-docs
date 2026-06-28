# std::unordered_multimap&lt;Key,T,Hash,KeyEqual,Allocator&gt;::erase

```cpp
iterator erase( iterator pos );  // (1) (desde C++11)
iterator erase( const_iterator pos );  // (2) (desde C++11)
iterator erase( const_iterator first, const_iterator last );  // (3) (desde C++11)
size_type erase( const Key& key );  // (4) (desde C++11)
template< class K >
size_type erase( K&& x );  // (5) (desde C++23)
```

Remove elementos especificados do container. A ordem dos elementos restantes é preservada. (Isso torna possível apagar elementos individuais enquanto se itera pelo container.)

1,2) Remove o elemento em `pos`.

3) Remove os elementos no range `[`first`, `last`)`, que deve ser um range válido em *this.

4) Remove todos os elementos com a chave equivalente a `key`.

5) Remove todos os elementos com chave que se compara _equivalente_ ao valor `x`. Esta sobrecarga participa da resolução de sobrecarga apenas se `Hash::is_transparent` e `KeyEqual::is_transparent` forem válidos e cada um denotar um tipo, e nem `iterator` nem `const_iterator` forem implicitamente conversíveis de `K`. Isso assume que tal `Hash` é chamável com ambos os tipos `K` e `Key`, e que o `KeyEqual` é transparente, o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

Referências e iterators para os elementos apagados são invalidados. Outros iterators e referências não são invalidados.

O iterator `pos` deve ser válido e desreferenciável. Assim, o iterator [end()](<#/doc/container/unordered_multimap/end>) (que é válido, mas não é desreferenciável) não pode ser usado como valor para `pos`.

### Parâmetros

- **pos** — iterator para o elemento a ser removido
- **first, last** — range de elementos a serem removidos
- **key** — valor da chave dos elementos a serem removidos
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave denotando os elementos a serem removidos

### Valor de retorno

1-3) Iterator que segue o último elemento removido.

4) Número de elementos removidos.

5) Número de elementos removidos.

### Exceções

1-3) Não lança exceções.

4,5) Quaisquer exceções lançadas pelos objetos `Hash` e `KeyEqual`.

### Complexidade

Dada uma instância `c` de `unordered_multimap`:

1,2) Caso médio: constante, pior caso: `c.size()`.

3) Caso médio: [std::distance](<#/doc/iterator/distance>)(first, last), pior caso: `c.size()`.

4) Caso médio: `c.count(key)`, pior caso: `c.size()`.

5) Caso médio: `c.count(x)`, pior caso: `c.size()`.

### Notas

Teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_associative_heterogeneous_erasure`](<#/doc/feature_test>) | [`202110L`](<#/>) | (C++23) | Remoção heterogênea em [containers associativos](<#/doc/container>) e [containers associativos não ordenados](<#/doc/container>); sobrecarga ([5](<#/doc/container/unordered_multimap/erase>))

### Exemplo

Execute este código
```cpp
    #include <unordered_map>
    #include <iostream>
     
    int main()
    {
        std::unordered_multimap<int, std::string> c =
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

Saída possível:
```
    two four six
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[LWG 2059](<https://cplusplus.github.io/LWG/issue2059>) | C++11 | havia ambiguidade para a sobrecarga (2) | adicionada a sobrecarga (1)
[LWG 2356](<https://cplusplus.github.io/LWG/issue2356>) | C++11 | a ordem dos elementos não equivalentes que não são apagados não era garantida de ser preservada | exigido que seja preservada

### Veja também

[ clear](<#/doc/container/unordered_multimap/clear>) | limpa o conteúdo
(função membro pública)