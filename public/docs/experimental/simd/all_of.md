# std::experimental::all_of, std::experimental::any_of, std::experimental::none_of, std::experimental::some_of

Definido no cabeçalho `[<experimental/simd>](<#/doc/header/experimental/simd>)`

```c
template< class T, class Abi >
bool all_of( const simd_mask<T, Abi>& k );
template< class T, class Abi >
bool any_of( const simd_mask<T, Abi>& k );
template< class T, class Abi >
bool none_of( const simd_mask<T, Abi>& k );
template< class T, class Abi >
bool some_of( const simd_mask<T, Abi>& k );
```

1) Retorna `true` se todos os valores em `k` forem `true`.

2) Retorna `true` se pelo menos um valor em `k` for `true`.

3) Retorna `true` se todos os valores em `k` forem `false`.

4) Retorna `true` se pelo menos um valor em `k` for `true`, mas nem todos os valores em `k` forem `true`.

### Parâmetros

- **k** — a [`simd_mask`](<#/doc/experimental/simd/simd_mask>) à qual aplicar a redução

### Valor de retorno

O resultado booleano da redução horizontal.

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <experimental/simd>
    
    namespace stq = std::experimental;
    
    int main()
    {
        using mask = stq::fixed_size_simd_mask<int, 4>;
    
        mask mask1{false}; // = {0, 0, 0, 0}
        assert(
            stq::none_of(mask1) == true &&
            stq::any_of(mask1) == false &&
            stq::some_of(mask1) == false &&
            stq::all_of(mask1) == false
        );
    
        mask mask2{true}; // = {1, 1, 1, 1}
        assert(
            stq::none_of(mask2) == false &&
            stq::any_of(mask2) == true &&
            stq::some_of(mask2) == false &&
            stq::all_of(mask2) == true
        );
    
        mask mask3{true};
        mask3[0] = mask3[1] = false; // mask3 = {0, 0, 1, 1}
        assert(
            stq::none_of(mask3) == false &&
            stq::any_of(mask3) == true &&
            stq::some_of(mask3) == true &&
            stq::all_of(mask3) == false
        );
    }
```