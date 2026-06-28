# Versão paralelizada de algoritmos existentes (parallelism TS)

As Extensões C++ para Parallelism TS fornecem versões paralelizadas dos 69 algoritmos existentes a seguir. Cada um dos seguintes algoritmos paralelizados
  
  * é declarado no namespace `std::experimental::parallel`,
  * não participa da resolução de sobrecarga a menos que `is_execution_policy<std::decay_t<ExecutionPolicy>>::value` seja `true`, e
  * possui a mesma semântica que o algoritmo existente correspondente na standard library C++, exceto conforme observado na página sobre [algoritmos paralelos](<https://en.cppreference.com/mwiki/index.php?title=cpp/experimental/parallelism/parallel_algorithms&action=edit&redlink=1> "cpp/experimental/parallelism/parallel algorithms \(page does not exist\)").

##### Operações de sequência não modificadoras
  
---  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
bool all_of( ExecutionPolicy&& policy, InputIt first, InputIt last,  
UnaryPred p ); | [std::all_of](<#/doc/algorithm/all_any_none_of>)  
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
bool any_of( ExecutionPolicy&& policy, InputIt first, InputIt last,  
UnaryPred p ); | [std::any_of](<#/doc/algorithm/all_any_none_of>)  
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
bool none_of( ExecutionPolicy&& policy, InputIt first, InputIt last,  
UnaryPred p ); | [std::none_of](<#/doc/algorithm/all_any_none_of>)  
template< class ExecutionPolicy, class InputIt, class T >  
typename iterator_traits&lt;InputIt&gt;::difference_type  
count( ExecutionPolicy&& policy, InputIt first, InputIt last,   
const T &value ); | [std::count](<#/doc/algorithm/count>)  
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
typename iterator_traits&lt;InputIt&gt;::difference_type  
count_if( ExecutionPolicy&& policy, InputIt first, InputIt last,  
UnaryPred p ); | [std::count_if](<#/doc/algorithm/count>)  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
[std::pair](<#/doc/utility/pair>)<InputIt1,InputIt2>  
mismatch( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2 );  
  
template< class ExecutionPolicy, class InputIt1,   
class InputIt2, class BinaryPred >  
[std::pair](<#/doc/utility/pair>)<InputIt1,InputIt2>  
mismatch( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, BinaryPred p );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
[std::pair](<#/doc/utility/pair>)<InputIt1,InputIt2>  
mismatch( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2 );  
  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class BinaryPred >  
[std::pair](<#/doc/utility/pair>)<InputIt1,InputIt2>  
mismatch( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2, BinaryPred p ); | [std::mismatch](<#/doc/algorithm/mismatch>)  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
bool equal( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2 );  
  
template< class ExecutionPolicy, class InputIt1,   
class InputIt2, class BinaryPred >  
bool equal( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, BinaryPred p );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
bool equal( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2 );  
  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class BinaryPred >  
bool equal( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,   
InputIt2 first2, InputIt2 last2, BinaryPred p ); | [std::equal](<#/doc/algorithm/equal>)  
template< class ExecutionPolicy, class InputIt, class T >  
InputIt find( ExecutionPolicy&& policy, InputIt first, InputIt last,  
const T& value ); | [std::find](<#/doc/algorithm/find>)  
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
InputIt find_if( ExecutionPolicy&& policy, InputIt first, InputIt last,  
UnaryPred p ); | [std::find_if](<#/doc/algorithm/find>)  
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
InputIt find_if_not( ExecutionPolicy&& policy,  
InputIt first, InputIt last,   
UnaryPred p ); | [std::find_if_not](<#/doc/algorithm/find>)  
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >  
ForwardIt1 find_end( ExecutionPolicy&& policy,  
ForwardIt1 first, ForwardIt1 last,  
ForwardIt2 s_first, ForwardIt2 s_last );  
  
template< class ExecutionPolicy, class ForwardIt1,  
class ForwardIt2, class BinaryPred >  
ForwardIt1 find_end( ExecutionPolicy&& policy,  
ForwardIt1 first, ForwardIt1 last,  
ForwardIt2 s_first, ForwardIt2 s_last,  
BinaryPred p ); | [std::find_end](<#/doc/algorithm/find_end>)  
template< class ExecutionPolicy, class InputIt, class ForwardIt >  
InputIt find_first_of( ExecutionPolicy&& policy,  
InputIt first, InputIt last,  
ForwardIt s_first, ForwardIt s_last );  
  
template< class ExecutionPolicy, class InputIt,  
class ForwardIt, class BinaryPred >  
InputIt find_first_of( ExecutionPolicy&& policy,  
InputIt first, InputIt last,  
ForwardIt s_first, ForwardIt s_last,  
BinaryPred p ); | [std::find_first_of](<#/doc/algorithm/find_first_of>)  
template< class ExecutionPolicy, class ForwardIt >  
ForwardIt adjacent_find( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class BinaryPred >  
ForwardIt adjacent_find( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last,  
BinaryPred p ); | [std::adjacent_find](<#/doc/algorithm/adjacent_find>)  
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >  
ForwardIt1 search( ExecutionPolicy&& policy,   
ForwardIt1 first, ForwardIt1 last,  
ForwardIt2 s_first, ForwardIt2 s_last );  
  
template< class ExecutionPolicy, class ForwardIt1,  
class ForwardIt2, class BinaryPred >  
ForwardIt1 search( ExecutionPolicy&& policy,  
ForwardIt1 first, ForwardIt1 last,  
ForwardIt2 s_first, ForwardIt2 s_last,  
BinaryPred p ); | [std::search](<#/doc/algorithm/search>)  
template< class ExecutionPolicy, class ForwardIt, class Size, class T >  
ForwardIt search_n( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last,  
Size count, const T& value );  
  
template< class ExecutionPolicy, class ForwardIt,  
class Size, class T, class BinaryPred >  
ForwardIt search_n( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last,  
Size count, const T& value,   
BinaryPred p ); | [std::search_n](<#/doc/algorithm/search_n>)  
  
##### Operações de sequência modificadoras   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt, class OutputIt >  
OutputIt copy( ExecutionPolicy&& policy, InputIt first, InputIt last,   
OutputIt d_first ); | [std::copy](<#/doc/algorithm/copy>)  
template< class ExecutionPolicy, class InputIt,  
class OutputIt, class UnaryPred >  
OutputIt copy_if( ExecutionPolicy&& policy, InputIt first, InputIt last,  
OutputIt d_first, UnaryPred pred ); | [std::copy_if](<#/doc/algorithm/copy>)  
template< class ExecutionPolicy, class InputIt,  
class Size, class OutputIt >  
OutputIt copy_n( ExecutionPolicy&& policy, InputIt first, Size count,  
OutputIt result ); | [std::copy_n](<#/doc/algorithm/copy_n>)  
template< class ExecutionPolicy, class InputIt, class OutputIt >  
OutputIt move( ExecutionPolicy&& policy, InputIt first, InputIt last,  
OutputIt d_first ); | [`std::move`](<#/doc/algorithm/move>)  
template< class ExecutionPolicy, class ForwardIt, class T >  
void fill( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last,  
const T& value ); | [std::fill](<#/doc/algorithm/fill>)  
template< class ExecutionPolicy, class OutputIt, class Size, class T >  
OutputIt fill_n( ExecutionPolicy&& policy, OutputIt first, Size count,  
const T& value ); | [std::fill_n](<#/doc/algorithm/fill_n>)  
template< class ExecutionPolicy, class InputIt,   
class OutputIt, class UnaryOp >  
OutputIt transform( ExecutionPolicy&& policy,   
InputIt first1, InputIt last1,   
OutputIt d_first, UnaryOp unary_op );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class BinaryOp >  
OutputIt transform( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,   
InputIt2 first2, OutputIt d_first,  
BinaryOp binary_op ); | [std::transform](<#/doc/algorithm/transform>)  
template< class ExecutionPolicy, class ForwardIt, class Generator >  
void generate( ExecutionPolicy&& policy, ForwardIt first, ForwardIt last,  
Generator g ); | [std::generate](<#/doc/algorithm/generate>)  
template< class ExecutionPolicy, class OutputIt,  
class Size, class Generator >  
OutputIt generate_n( ExecutionPolicy&& policy, OutputIt first,  
Size count, Generator g ); | [std::generate_n](<#/doc/algorithm/generate_n>)  
template< class ExecutionPolicy, class ForwardIt, class T >  
ForwardIt remove( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last, const T& value ); | [`std::remove`](<#/doc/algorithm/remove>)  
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >  
ForwardIt remove_if( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, UnaryPred p ); | [std::remove_if](<#/doc/algorithm/remove>)  
template< class ExecutionPolicy, class InputIt, class OutputIt, class T >  
OutputIt remove_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,   
OutputIt d_first, const T& value ); | [std::remove_copy](<#/doc/algorithm/remove_copy>)  
template< class ExecutionPolicy, class InputIt,  
class OutputIt, class UnaryPred >  
OutputIt remove_copy_if( ExecutionPolicy&& policy,   
InputIt first, InputIt last,   
OutputIt d_first, UnaryPred p ); | [std::remove_copy_if](<#/doc/algorithm/remove_copy>)  
template< class ExecutionPolicy, class ForwardIt, class T >  
void replace( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last,  
const T& old_value, const T& new_value ); | [std::replace](<#/doc/algorithm/replace>)  
template< class ExecutionPolicy, class ForwardIt,  
class UnaryPred, class T >  
void replace_if( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last,  
UnaryPred p, const T& new_value ); | [std::replace_if](<#/doc/algorithm/replace>)  
template< class ExecutionPolicy, class InputIt, class OutputIt, class T >  
OutputIt replace_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last, OutputIt d_first,  
const T& old_value, const T& new_value ); | [std::replace_copy](<#/doc/algorithm/replace_copy>)  
template< class ExecutionPolicy, class InputIt, class OutputIt,  
class UnaryPred, class T >  
OutputIt replace_copy_if( ExecutionPolicy&& policy,   
InputIt first, InputIt last, OutputIt d_first,  
UnaryPred p, const T& new_value ); | [std::replace_copy_if](<#/doc/algorithm/replace_copy>)  
template< class ExecutionPolicy, class ForwardIt1, class ForwardIt2 >  
ForwardIt2 swap_ranges( ExecutionPolicy&& policy,  
ForwardIt1 first1, ForwardIt1 last1,  
ForwardIt2 first2 ); | [std::swap_ranges](<#/doc/algorithm/swap_ranges>)  
template< class ExecutionPolicy, class BidirIt >  
void reverse( ExecutionPolicy&& policy, BidirIt first, BidirIt last ); | [std::reverse](<#/doc/algorithm/reverse>)  
template< class ExecutionPolicy, class BidirIt, class OutputIt >  
OutputIt reverse_copy( ExecutionPolicy&& policy,   
BidirIt first, BidirIt last, OutputIt d_first ); | [std::reverse_copy](<#/doc/algorithm/reverse_copy>)  
template< class ExecutionPolicy, class ForwardIt >  
ForwardIt rotate( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt n_first, ForwardIt last ); | [std::rotate](<#/doc/algorithm/rotate>)  
template< class ExecutionPolicy, class ForwardIt, class OutputIt >  
OutputIt rotate_copy( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt n_first, ForwardIt last,  
OutputIt d_first ); | [std::rotate_copy](<#/doc/algorithm/rotate_copy>)  
template< class ExecutionPolicy, class ForwardIt >  
ForwardIt unique( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class BinaryPred >  
ForwardIt unique( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, BinaryPred p ); | [std::unique](<#/doc/algorithm/unique>)  
template< class ExecutionPolicy, class InputIt, class OutputIt >  
OutputIt unique_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt,  
class OutputIt, class BinaryPred >  
OutputIt unique_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
OutputIt d_first, BinaryPred p ); | [std::unique_copy](<#/doc/algorithm/unique_copy>)  
  
##### Operações de particionamento   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt, class UnaryPred >  
bool is_partitioned( ExecutionPolicy&& policy,   
InputIt first, InputIt last, UnaryPred p ); | [std::is_partitioned](<#/doc/algorithm/is_partitioned>)  
template< class ExecutionPolicy, class ForwardIt, class UnaryPred >  
ForwardIt partition( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, UnaryPred p ); | [std::partition](<#/doc/algorithm/partition>)  
template< class ExecutionPolicy, class InputIt, class OutputIt1,  
class OutputIt2, class UnaryPred >  
[std::pair](<#/doc/utility/pair>)<OutputIt1, OutputIt2>  
partition_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
OutputIt1 d_first_true, OutputIt2 d_first_false,  
UnaryPred p ); | [std::partition_copy](<#/doc/algorithm/partition_copy>)  
template< class ExecutionPolicy, class BidirIt, class UnaryPred >  
BidirIt stable_partition( ExecutionPolicy&& policy,   
BidirIt first, BidirIt last, UnaryPred p ); | [std::stable_partition](<#/doc/algorithm/stable_partition>)  
  
##### Operações de ordenação   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class ForwardIt >  
bool is_sorted( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class Compare >  
bool is_sorted( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, Compare cmp ); | [std::is_sorted](<#/doc/algorithm/is_sorted>)  
template< class ExecutionPolicy, class ForwardIt >  
ForwardIt is_sorted_until( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class Compare >  
ForwardIt is_sorted_until( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last,   
Compare cmp ); | [std::is_sorted_until](<#/doc/algorithm/is_sorted_until>)  
template< class ExecutionPolicy, class RandomIt >  
void sort( ExecutionPolicy&& policy, RandomIt first, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
void sort( ExecutionPolicy&& policy,   
RandomIt first, RandomIt last, Compare cmp ); | [std::sort](<#/doc/algorithm/sort>)  
template< class ExecutionPolicy, class RandomIt >  
void partial_sort( ExecutionPolicy&& policy,  
RandomIt first, RandomIt middle, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
void partial_sort( ExecutionPolicy&& policy,   
RandomIt first, RandomIt middle, RandomIt last,  
Compare cmp ); | [std::partial_sort](<#/doc/algorithm/partial_sort>)  
template< class ExecutionPolicy, class InputIt, class RandomIt >  
RandomIt partial_sort_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
RandomIt d_first, RandomIt d_last );  
  
template< class ExecutionPolicy, class InputIt,  
class RandomIt, class Compare >  
RandomIt partial_sort_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
RandomIt d_first, RandomIt d_last,  
Compare cmp ); | [std::partial_sort_copy](<#/doc/algorithm/partial_sort_copy>)  
template< class ExecutionPolicy, class RandomIt >  
void stable_sort( ExecutionPolicy&& policy,   
RandomIt first, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
void stable_sort( ExecutionPolicy&& policy,  
RandomIt first, RandomIt last, Compare cmp ); | [std::stable_sort](<#/doc/algorithm/stable_sort>)  
template< class ExecutionPolicy, class RandomIt >  
void nth_element( ExecutionPolicy&& policy,  
RandomIt first, RandomIt nth, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
void nth_element( ExecutionPolicy&& policy,  
RandomIt first, RandomIt nth, RandomIt last,  
Compare cmp ); | [std::nth_element](<#/doc/algorithm/nth_element>)  
  
##### Operações de conjunto (em ranges ordenados)   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class OutputIt >  
OutputIt merge( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class Compare >  
OutputIt merge( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first, Compare cmp ); | [std::merge](<#/doc/algorithm/merge>)  
template< class ExecutionPolicy, class BidirIt >  
void inplace_merge( ExecutionPolicy&& policy,  
BidirIt first, BidirIt middle, BidirIt last );  
  
template< class ExecutionPolicy, class BidirIt, class Compare >  
void inplace_merge( ExecutionPolicy&& policy,  
BidirIt first, BidirIt middle, BidirIt last,  
Compare cmp ); | [std::inplace_merge](<#/doc/algorithm/inplace_merge>)  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
bool includes( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2 );  
  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class Compare >  
bool includes( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2, Compare cmp ); | [std::includes](<#/doc/algorithm/includes>)  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class OutputIt >  
OutputIt set_difference( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class Compare >  
OutputIt set_difference( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first, Compare cmp ); | [std::set_difference](<#/doc/algorithm/set_difference>)  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class OutputIt >  
OutputIt set_intersection( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class Compare >  
OutputIt set_intersection( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first, Compare cmp ); | [std::set_intersection](<#/doc/algorithm/set_intersection>)  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class OutputIt >  
OutputIt set_symmetric_difference( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class Compare >  
OutputIt set_symmetric_difference( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first, Compare cmp ); | [std::set_symmetric_difference](<#/doc/algorithm/set_symmetric_difference>)  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class OutputIt >  
OutputIt set_union( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class OutputIt, class Compare >  
OutputIt set_union( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
OutputIt d_first, Compare cmp ); | [std::set_union](<#/doc/algorithm/set_union>)  
  
##### Operações de heap   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class RandomIt >  
bool is_heap( ExecutionPolicy&& policy,  
RandomIt first, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
bool is_heap( ExecutionPolicy&& policy,  
RandomIt first, RandomIt last, Compare cmp ); | [std::is_heap](<#/doc/algorithm/is_heap>)  
template< class ExecutionPolicy, class RandomIt >  
RandomIt is_heap_until( ExecutionPolicy&& policy,   
RandomIt first, RandomIt last );  
  
template< class ExecutionPolicy, class RandomIt, class Compare >  
RandomIt is_heap_until( ExecutionPolicy&& policy,   
RandomIt first, RandomIt last, Compare cmp ); | [std::is_heap_until](<#/doc/algorithm/is_heap_until>)  
  
##### Operações de mínimo/máximo   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class ForwardIt >   
ForwardIt max_element( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class Compare >  
ForwardIt max_element( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, Compare cmp ); | [std::max_element](<#/doc/algorithm/max_element>)  
template< class ExecutionPolicy, class ForwardIt >   
ForwardIt min_element( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class Compare >  
ForwardIt min_element( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, Compare cmp ); | [std::min_element](<#/doc/algorithm/min_element>)  
template< class ExecutionPolicy, class ForwardIt >   
[std::pair](<#/doc/utility/pair>)<ForwardIt,ForwardIt>  
minmax_element( ExecutionPolicy&& policy,  
ForwardIt first, ForwardIt last );  
  
template< class ExecutionPolicy, class ForwardIt, class Compare >  
[std::pair](<#/doc/utility/pair>)<ForwardIt,ForwardIt>   
minmax_element( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last, Compare cmp ); | [std::minmax_element](<#/doc/algorithm/minmax_element>)  
template< class ExecutionPolicy, class InputIt1, class InputIt2 >  
bool lexicographical_compare( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2 );  
  
template< class ExecutionPolicy, class InputIt1,   
class InputIt2, class Compare >  
bool lexicographical_compare( ExecutionPolicy&& policy,  
InputIt1 first1, InputIt1 last1,  
InputIt2 first2, InputIt2 last2,  
Compare cmp ); | [std::lexicographical_compare](<#/doc/algorithm/lexicographical_compare>)  
  
##### Operações numéricas   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt, class OutputIt >  
OutputIt adjacent_difference( ExecutionPolicy&& policy,   
InputIt first, InputIt last,   
OutputIt d_first );  
  
template< class ExecutionPolicy, class InputIt,  
class OutputIt, class BinaryOp >  
OutputIt adjacent_difference( ExecutionPolicy&& policy,   
InputIt first, InputIt last,   
OutputIt d_first, BinaryOp op ); | [std::adjacent_difference](<#/doc/algorithm/adjacent_difference>)  
template< class ExecutionPolicy, class InputIt1,  
class InputIt2, class T >  
T inner_product( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1, InputIt2 first2,  
T value );  
  
template< class ExecutionPolicy, class InputIt1, class InputIt2,  
class T, class BinaryOp1, class BinaryOp2 >   
T inner_product( ExecutionPolicy&& policy,   
InputIt1 first1, InputIt1 last1, InputIt2 first2,  
T value, BinaryOp1 op1, BinaryOp2 op2 ); | [std::inner_product](<#/doc/algorithm/inner_product>)  
  
##### Operações em memória não inicializada   
  
Algoritmo paralelizado | Algoritmo existente   
template< class ExecutionPolicy, class InputIt, class ForwardIt >  
ForwardIt uninitialized_copy( ExecutionPolicy&& policy,   
InputIt first, InputIt last,  
ForwardIt d_first ); | [std::uninitialized_copy](<#/doc/memory/uninitialized_copy>)  
template< class ExecutionPolicy, class InputIt,  
class Size, class ForwardIt >  
ForwardIt uninitialized_copy_n( ExecutionPolicy&& policy,  
InputIt first, Size count,   
ForwardIt d_first ); | [std::uninitialized_copy_n](<#/doc/memory/uninitialized_copy_n>)  
template< class ExecutionPolicy, class ForwardIt, class T >  
void uninitialized_fill( ExecutionPolicy&& policy,   
ForwardIt first, ForwardIt last,  
const T& value ); | [std::uninitialized_fill](<#/doc/memory/uninitialized_fill>)  
template< class ExecutionPolicy, class ForwardIt, class Size, class T >  
ForwardIt uninitialized_fill_n( ExecutionPolicy&& policy,  
ForwardIt first, Size count,  
const T& value ); | [std::uninitialized_fill_n](<#/doc/memory/uninitialized_fill_n>)