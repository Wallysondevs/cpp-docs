# std::vector&lt;T,Allocator&gt;::operator[]

reference operator[]( size_type pos ); | (1) | (constexpr desde C++20)
---|---|---
const_reference operator[]( size_type pos ) const; | (2) | (constexpr desde C++20)

Retorna uma referência para o elemento na posição especificada pos. Nenhuma verificação de limites é realizada.

### Parâmetros

- **pos** — posição do elemento a ser retornado

### Valor de retorno

Referência para o elemento solicitado.

### Complexidade

Constante.

### Observações

Ao contrário de [std::map::operator[]](<#/doc/container/map/operator_at>), este operador nunca insere um novo elemento no container. Acessar um elemento inexistente através deste operador é comportamento indefinido.

### Exemplo

O código a seguir usa operator[] para ler e escrever em um [std::vector](<#/doc/container/vector>)&lt;int&gt;:

Execute este código
```
    #include <vector>
    #include <iostream>
     
    int main()
    {
        std::vector<int> numbers{2, 4, 6, 8};
     
        std::cout << "Second element: " << numbers[1] << '\n';
     
        numbers[0] = 5;
     
        std::cout << "All numbers:";
        for (auto i : numbers)
            std::cout << ' ' << i;
        std::cout << '\n';
    }
     
    // Desde C++20 std::vector pode ser usado em contexto constexpr:
    #if defined(__cpp_lib_constexpr_vector) and defined(__cpp_consteval)
    // Obtém a soma de todos os primos em [0, N) usando o crivo de Eratóstenes
    consteval auto sum_of_all_primes_up_to(unsigned N)
    {
        if (N < 2)
            return 0ULL;
     
        std::vector<bool> is_prime(N, true);
        is_prime[0] = is_prime[1] = false;
     
        auto propagate_non_primality = & n)
        {
            for (decltype(N) m = n + n; m < is_prime.size(); m += n)
                is_prime[m] = false;
        };
     
        auto sum{0ULL};
        for (decltype(N) n{2}; n != N; ++n)
            if (is_prime[n])
            {
                sum += n;
                propagate_non_primality(n);
            }
     
        return sum;
    } //< a memória do vector é liberada aqui
     
    static_assert(sum_of_all_primes_up_to(42) == 0xEE);
    static_assert(sum_of_all_primes_up_to(100) == 0x424);
    static_assert(sum_of_all_primes_up_to(1001) == 76127);
    #endif
```

Saída:
```
    Second element: 4
    All numbers: 5 4 6 8
```

### Veja também

[ at](<#/doc/container/vector/at>) | acessa o elemento especificado com verificação de limites
(função membro pública)