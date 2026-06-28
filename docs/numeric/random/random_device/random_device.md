# std::random_device::random_device

```cpp
random_device() : random_device( /*implementation-defined*/ ) {}  // (1) (desde C++11)
explicit random_device( const std::string& token );  // (2) (desde C++11)
random_device( const random_device& ) = delete;  // (3) (desde C++11)
```

1) Constrói por padrão um novo objeto [std::random_device](<#/doc/numeric/random/random_device>) com um `token` definido pela implementação.

2) Constrói um novo objeto [std::random_device](<#/doc/numeric/random/random_device>), utilizando o `token` do argumento de uma maneira definida pela implementação.

3) O construtor de cópia é deletado: `std::random_device` não é copiável nem movível.

### Exceções

Lança uma exceção definida pela implementação, derivada de [std::exception](<#/doc/error/exception>), em caso de falha.

### Notas

A implementação em [libstdc++](<https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/src/c%2B%2B11/random.cc#L319>) espera que `token` nomeie a fonte de bytes aleatórios. Valores de `token` possíveis incluem "default", "hw", "rand_s", "rdseed", "rdrand", "rdrnd", "/dev/urandom", "/dev/random", "mt19937", e uma string de inteiro especificando a seed do motor mt19937. (Valores de `token` diferentes de "default" são válidos apenas para certos alvos.)

A implementação em [libc++](<https://github.com/llvm/llvm-project/blob/main/libcxx/src/random.cpp#L124>), quando configurada para usar um dispositivo de caractere como fonte, espera que `token` seja o nome de um dispositivo de caractere que produz números aleatórios quando lido; caso contrário, espera que `token` seja "/dev/urandom".

Ambos libstdc++ e libc++ lançam uma exceção se um `token` não suportado for fornecido. A [stdlib da Microsoft](<https://github.com/microsoft/STL/blob/c10ae01b4d9508eed9d5f059a120ee7223b6ac12/stl/inc/random#L5026>) ignora o `token` inteiramente.

### Exemplo

Demonstra tipos de `std::random_device` comumente disponíveis no Linux.

Execute este código
```cpp
    #include <iostream>
    #include <random>
     
    void demo(std::random_device&& rd)
    {
        static std::uniform_int_distribution<int> d(0, 9);
        for (int n = 0; n != 10; ++n)
            std::cout << d(rd) << ' ';
        std::cout << '\n';
    }
     
    int main()
    {
        // Nota: Como o token fornecido é tratado é definido pela implementação!
     
        // O token padrão para random_device é geralmente /dev/urandom no Linux
        demo(std::random_device {});
     
        // Solicita /dev/random, bloqueia quando a entropia está vazia
        // Funciona no libstdc++, ignorado no msvc++, pode lançar exceção no libc++ (a partir de Nov 2022)
        demo(std::random_device {"/dev/random"});
     
        // Solicita /dev/urandom não bloqueante, garante que RDRAND não seja usado
        // Funciona no libstdc++ e libc++, ignorado no msvc++ (a partir de Nov 2022)
        demo(std::random_device {"/dev/urandom"});
     
        // Solicita "hw", usará geração aleatória baseada em hardware como rdrand
        // Funciona no libstdc++, ignorado no msvc++, lança exceção no libc++ (a partir de Nov 2022)
        demo(std::random_device {"hw"});
    }
```

Saída possível:
```
    9 5 2 7 5 9 4 1 0 7 
    4 7 6 5 1 5 5 1 8 6 
    3 3 6 1 4 1 4 1 0 2 
    4 6 3 9 1 9 4 0 9 3
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | construtor padrão era explícito | tornado implícito