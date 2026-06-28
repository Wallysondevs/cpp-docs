# std::inplace_vector&lt;T,N&gt;::resize

```cpp
constexpr void resize( size_type count );  // (1) (desde C++26)
constexpr void resize( size_type count, const value_type& value );  // (2) (desde C++26)
```

Redimensiona o container para conter count elementos, não faz nada se count == size().

Se o tamanho atual for maior que count, o container é reduzido aos seus primeiros count elementos.

Se o tamanho atual for menor que count, então:

1) Elementos adicionais [default-inserted](<#/doc/named_req/DefaultInsertable>) são anexados.

2) Cópias adicionais de value são anexadas.

### Parâmetros

- **count** — novo tamanho do container
- **value** — o valor para inicializar os novos elementos

Requisitos de tipo
-`T` deve satisfazer os requisitos de [DefaultInsertable](<#/doc/named_req/DefaultInsertable>) para usar a sobrecarga (1).
-`T` deve satisfazer os requisitos de [CopyInsertable](<#/doc/named_req/CopyInsertable>) para usar a sobrecarga (2).

### Complexidade

Linear na diferença entre o tamanho atual e count.

### Exceções

1,2) Lança [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se count > N.

Se uma exceção for lançada por qualquer motivo, essas funções não têm efeito ([garantia de segurança de exceção forte](<#/doc/language/exceptions>)).

### Exemplo

Execute este código
```cpp
    #include <inplace_vector>
    #include <print>
    
    int main()
    {
        std::inplace_vector<int, 6> v(6, 9);
        std::println("Initially, v = {}", v);
    
        v.resize(2);
        std::println("After resize(2), v = {}", v);
    
        v.resize(4);
        std::println("After resize(4), v = {}", v);
    
        v.resize(6, -1);
        std::println("After resize(6, -1), v = {}", v);
    
        try
        {
            std::print("Trying resize(13): ");
            v.resize(13); // throws, because count > N; v is left unchanged
        }
        catch(const std::bad_alloc& ex)
        {
            std::println("ex.what(): {}", ex.what());
        }
        std::println("After exception, v = {}", v);
    }
```

Saída possível:
```
    Inicialmente, v = [9, 9, 9, 9, 9, 9]
    Após resize(2), v = [9, 9]
    Após resize(4), v = [9, 9, 0, 0]
    Após resize(6, -1), v = [9, 9, 0, 0, -1, -1]
    Tentando resize(13): ex.what(): std::bad_alloc
    Após exceção, v = [9, 9, 0, 0, -1, -1]
```

### Veja também

[ max_size](<#/doc/container/inplace_vector/max_size>)[static] | retorna o número máximo possível de elementos
(função membro estática pública)
[ size](<#/doc/container/inplace_vector/size>) | retorna o número de elementos
(função membro pública)
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] | retorna o número de elementos que podem ser armazenados na memória atualmente alocada
(função membro estática pública)
[ empty](<#/doc/container/inplace_vector/empty>) | verifica se o container está vazio
(função membro pública)