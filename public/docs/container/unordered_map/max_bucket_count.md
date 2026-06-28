# std::unordered_map&lt;Key,T,Hash,KeyEqual,Allocator&gt;::max_bucket_count

size_type max_bucket_count() const; |  |  (desde C++11)  

  
Retorna o número máximo de buckets que o container é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca.

### Parameters

(nenhum) 

### Return value

Número máximo de buckets. 

### Complexity

Constante. 

### Example

Execute este código
```
    #include <iostream>
    #include <unordered_map>
     
    int main()
    {
        struct Ha { std::size_t operator()(long x) const { return std::hash<long>{}(x); }; };
     
        auto c1 = std::unordered_map<char, long>{};
        auto c2 = std::unordered_map<long, long>{};
        auto c3 = std::unordered_map<long, long, std::hash<int>>{};
        auto c4 = std::unordered_map<long, long, Ha>{};
     
        std::cout
            << "Max bucket count of\n" << std::hex << std::showbase
            << "c1: " << c1.max_bucket_count() << '\n'
            << "c2: " << c2.max_bucket_count() << '\n'
            << "c3: " << c3.max_bucket_count() << '\n'
            << "c4: " << c4.max_bucket_count() << '\n'
            ;
    }
```

Saída possível: 
```
    Max bucket count of
    c1: 0xfffffffffffffff
    c2: 0xfffffffffffffff
    c3: 0xfffffffffffffff
    c4: 0xaaaaaaaaaaaaaaa
```

### See also

[ bucket_count](<#/doc/container/unordered_map/bucket_count>) |  retorna o número de buckets   
(função membro pública)  