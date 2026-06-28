# std::flat_set&lt;Key,Compare,KeyContainer&gt;::insert

```cpp
std::pair<iterator, bool> insert( const value_type& value );  // (1) (desde C++23)
std::pair<iterator, bool> insert( value_type&& value );  // (2) (desde C++23)
iterator insert( const_iterator pos, const value_type& value );  // (3) (desde C++23)
iterator insert( const_iterator pos, value_type&& value );  // (4) (desde C++23)
template< class K >
iterator insert( const_iterator pos, K&& x );  // (5) (desde C++23)
template< class InputIt >
void insert( InputIt first, InputIt last );  // (6) (desde C++23)
template< class K >
std::pair<iterator, bool> insert( K&& x );  // (7) (desde C++23)
template< class InputIt >
void insert( std::sorted_unique_t, InputIt first, InputIt last );  // (8) (desde C++23)
void insert( std::initializer_list<key_type> ilist );  // (9) (desde C++23)
void insert( std::sorted_unique_t s, std::initializer_list<key_type> ilist );  // (10) (desde C++23)
```

Insere elemento(s) no container, se o container ainda não contiver um elemento com uma chave equivalente.

1) Insere value. Equivalente a return emplace(value);.

2) Insere value. Equivalente a return emplace(std::move(value));.

3) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, value);.

4) Insere value na posição o mais próximo possível da posição imediatamente anterior a pos. Equivalente a return emplace_hint(pos, std::move(value));.

5,7) Se *this já contiver um elemento que se compara transparentemente como equivalente a x, não faz nada. Caso contrário, insere um novo elemento como se por:

  * (5) emplace(pos, [std::forward](<#/doc/utility/forward>)&lt;K&gt;(x)) (na posição o mais próximo possível da posição imediatamente anterior a pos);
  * (7) emplace([std::forward](<#/doc/utility/forward>)&lt;K&gt;(x)).

A conversão de x para [`key_type`](<#/doc/container/flat_set>) deve construir um objeto u, para o qual find(k) == find(u) é verdadeiro. Caso contrário, o comportamento é indefinido.

Essas sobrecargas participam da resolução de sobrecarga apenas se

  * O qualified-id `Compare::is_transparent` for válido e denotar um tipo, e
  * [std::is_constructible_v](<#/doc/types/is_constructible>)<value_type, K> for verdadeiro,

o que, juntos, permite chamar esta função sem construir uma instância de `Key`.

6) Equivalente à sequência de operações:

  1. Insere elementos do range `[`first`, `last`)` como se por c.insert(c.end(), first, last);.
  2. Ordena o range de elementos recém-inseridos em relação a [`_compare_`](<#/doc/container/flat_set>).
  3. Mescla o range ordenado resultante e o range ordenado de elementos pré-existentes em um único range ordenado. (Nota: a operação de mesclagem pode alocar memória).
  4. Apaga todos, exceto o primeiro elemento, de cada grupo de elementos equivalentes consecutivos.

Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

8) Insere elementos do range `[`first`, `last`)`. Equivalente a insert(first, last);.

Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

9) Insere elementos da initializer list ilist. Equivalente a insert(ilist.begin(), ilist.end());.

Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

10) Insere elementos da initializer list ilist. Equivalente a insert(s, ilist.begin(), ilist.end());.

Se múltiplos elementos no range tiverem chaves que se comparam como equivalentes, é não especificado qual elemento é inserido (pendente [LWG2844](<https://cplusplus.github.io/LWG/issue2844>)).

| As informações sobre invalidação de iteradores são copiadas de [aqui](<https://en.cppreference.com/w/Template:cpp/container/note_iterator_invalidation> "Template:cpp/container/note iterator invalidation")

### Parâmetros

- **pos** — iterator para a posição antes da qual o novo elemento será inserido
- **value** — valor do elemento a ser inserido
- **first, last** — range de elementos a serem inseridos
- **ilist** — initializer list da qual inserir os valores
- **x** — um valor de qualquer tipo que pode ser comparado transparentemente com uma chave
- **s** — uma [tag de desambiguação](<#/doc/container/sorted_unique>) indicando que a sequência de entrada está ordenada (em relação a [`_compare_`](<#/doc/container/flat_set>)) e contém apenas elementos únicos
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Valor de retorno

1,2) Um par consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como true se e somente se a inserção ocorreu.

3-5) Um iterator para o elemento inserido, ou para o elemento que impediu a inserção.

6) (nenhum)

7) Um par consistindo de um iterator para o elemento inserido (ou para o elemento que impediu a inserção) e um valor booleano definido como true se e somente se a inserção ocorreu.

8-10) (nenhum)

### Exceções

1-5,7) Se uma exceção for lançada por qualquer operação, a inserção não tem efeito.

| Esta seção está incompleta
Razão: casos 6,8-10

### Complexidade

1-5) Linear em [`size()`](<#/doc/container/flat_set/size>).

6) N + M·log(M), onde `N` é o [`size()`](<#/doc/container/flat_set/size>) antes da operação e `M` é [std::distance](<#/doc/iterator/distance>)(first, last).

7) Linear em [`size()`](<#/doc/container/flat_set/size>).

8) Linear em `N`, onde `N` é [`size()`](<#/doc/container/flat_set/size>) após a operação.

9) N + M·log(M), onde `N` é o [`size()`](<#/doc/container/flat_set/size>) antes da operação e `M` é ilist.size().

10) Linear em `N`, onde `N` é [`size()`](<#/doc/container/flat_set/size>) após a operação.

| Esta seção está incompleta
Razão: verificar novamente a complexidade: 1-5, 7, 9, 10. A busca é log(N), mas a inserção no container subjacente é N/2 em média => Linear.

### Notas

A inserção com hint (3-5) não retorna um booleano para ser compatível com a assinatura da inserção posicional em containers sequenciais, como [std::vector::insert](<#/doc/container/vector/insert>). Isso possibilita a criação de inserters genéricos como [std::inserter](<#/doc/iterator/inserter>). Uma maneira de verificar o sucesso de uma inserção com hint é comparar [`size()`](<#/doc/container/flat_set/size>) antes e depois.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <flat_set>
    #include <iostream>
    
    int main()
    {
        std::flat_set<int> set;
    
        auto result_1 = set.insert(3);
        assert(result_1.first != set.end()); // it is a valid iterator
        assert(*result_1.first == 3);
        if (result_1.second)
            std::cout << "insert done\n";
    
        auto result_2 = set.insert(3);
        assert(result_2.first == result_1.first); // the same iterator
        assert(*result_2.first == 3);
        if (!result_2.second)
            std::cout << "no insertion\n";
    }
```

Saída:
```
    insert done
    no insertion
```

### Veja também

[ emplace](<#/doc/container/flat_set/emplace>) | constrói elemento no local
(função membro pública)
[ emplace_hint](<#/doc/container/flat_set/emplace_hint>) | constrói elementos no local usando um hint
(função membro pública)
[ inserter](<#/doc/iterator/inserter>) | cria um [std::insert_iterator](<#/doc/iterator/insert_iterator>) de tipo inferido a partir do argumento
(template de função)